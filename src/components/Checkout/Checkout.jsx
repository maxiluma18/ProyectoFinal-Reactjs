import { CartContext } from "../../context/CartContext";
import { useContext, useState } from 'react';
import { getDocs, collection, query, where, documentId, writeBatch, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import clases from "./Checkout.module.css"

const Checkout =()=>{
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const [ loading, setLoading ] = useState(false);
    const [ orderId, setOrderId ] = useState(null);

    const createOrder = async (userData) =>{
        userData.preventDefault()
        setLoading(true)

        const datosForm = new FormData(userData.target);
        try {
            const objOrder = {
                buyer: {
                    name: datosForm.get('name'),
                    phone: datosForm.get('phone'),
                    email: datosForm.get('email')
                },
                items: cart,
                total: totalPrice,
                date: Timestamp.fromDate(new Date())
            }
            const batch = writeBatch(db)    
            const ids = cart.map(prod => prod.id)
            const productsCollection = query(collection(db, 'productos'), where(documentId(), 'in', ids))
            const outOfStock = []
            const querySnapshot = await getDocs(productsCollection)
            const { docs } = querySnapshot

            docs.forEach(doc => {
                const data = doc.data()
                const stockDb = data.stock
        
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart.quantity
        
                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...data})
                }
            })
            if (outOfStock.length === 0) {
                if(datosForm.get('email')===datosForm.get( "confirmarEmail")){
                batch.commit() 
                const orderCollection = collection(db, 'ordenes')
                const { id } = await addDoc(orderCollection, objOrder)
                
                clearCart()
                setOrderId(id)
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Error en el formulario",
                        text: `Los emails no coinciden`,
                        timer:4000,
                        timerProgressBar:true,
                    }    )  
                }
            } else {
                console.error('Hay productos que no tienen stock. No se pudo generar la orden de compra')
                Swal.fire({
                    icon: "error",
                    title: "Error en el carrito",
                    text: `Los productos elegidos no están disponibles para su pedido, pruebe con otros! `,
                    timer:4000,
                    timerProgressBar:true,
                }    )  
            }
        } catch (error) {
            console.error('Hubo un error en la generacion de la orden')
            Swal.fire({
                icon: "error",
                title: "Error en la generación de la orden",
                timer:4000,
                timerProgressBar:true,
            }    )  
        } finally {
            setLoading(false)
        }
        }

        if(loading) {
            return <h1 className={clases.parrafos}>Espere, estamos verificando que todo este correcto...</h1>
        }

        if(orderId) {
            return (
                <div>
                    <p  className={clases.parrafos}>Gracias por la compra, espero le guste lo elegido!!</p>
                    <h1  className={clases.parrafos}>Su orden ha sido generada con exito. El id de su orden es:</h1>
                    <h1 className={clases.orden}> {orderId}</h1>
                </div>
            )
        }

        return(
            <div>
                <h1 className={clases.parrafos}>Checkout</h1>
                <form className ={clases.form}onSubmit={ createOrder } >
                    <div >
                        <div className={clases.flex_column}>
                            <label className={clases.label} htmlFor="inputName" >Nombre completo</label>
                            <input className={clases.input} type="text"  name='name' required/>
                        </div>
                    </div>
                    <div >
                        <div  className={clases.flex_column}>
                            <label className={clases.label} htmlFor="inputPhone" >Número de teléfono</label>
                            <input className={clases.input} type="text"  name='phone' required/>
                        </div>
                    </div>
                    <div >
                        <div  className={clases.flex_column}>
                            <label className={clases.label} htmlFor="inputEmail" >Email</label>
                            <input className={clases.input} type="email" name='email'required/>
                        </div>
                    </div>
                    <div >
                        <div  className={clases.flex_column}>
                            <label className={clases.label} htmlFor="inputConfirmEmail" >Confirmar email</label>
                            <input className={clases.input} type="email" name='confirmarEmail'required/>
                        </div>
                    </div>  
                    <div >
                        <button className={clases.boton_check}>Generar orden de compra</button>
                    </div>
                </form>
                <div className={clases.container}>
                    <button className={clases.boton_carrito} ><Link className={clases.enlaces} to="/">Volver al catalogo</Link></button>
                    <button className={clases.boton_carrito}><Link className={clases.enlaces} to="/cart">Ver mi carrito</Link></button>
                </div>
                
            </div>
        )
}

export default  Checkout;