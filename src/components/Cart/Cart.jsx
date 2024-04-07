import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import clases from "./Cart.module.css"
import Swal from 'sweetalert2'

const Cart = () => {
    const { cart, removeItem, totalPrice, clearCart, totalQuantity} = useContext(CartContext);

    const eliminar = (id) =>{
        Swal.fire({
            title: `¿Estas seguro de querer eliminar este item?`,
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id);
                Swal.fire({
                    title:'Eliminado!',
                    text:'El producto ha sido eliminado del carrito.',
                    icon:'success'
                })}})
        }
    
    const eliminarTodo =()=>{
        Swal.fire({
            title:`¿Estás seguro de querer borrar todo el carrito?`,
            text:"No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Borrar todo!'
        }).then((result)=>{
            if(result.isConfirmed){
                clearCart();
                Swal.fire('Carrito Vaciado','Se han eliminado todos los items del carrito','success')
            }
        })
    };

    

    return (
        <div>
            {!totalQuantity<1 ? (
                <div>
                <h1 className={clases.parrafos}>Carrito de Compras</h1>
                <section>
                    {cart.map(producto => (
                        <div key={producto.id}>
                            <div className={clases.container} >
                                <img className={clases.img} src={producto.img} alt={producto.nombre} />
                                <h2 className={clases.parrafos}>{producto.nombre}</h2>
                                <p className={clases.parrafos} >Cantidad: {producto.quantity}</p>
                                <p className={clases.parrafos}>Precio unitario: ${producto.precio}</p>
                                <button className={clases.boton} onClick={() => eliminar(producto.id)}>X</button>
    
                            </div>
                        </div>
                    ))}
                </section>
                <div>
                    <p className={clases.parrafos}>Total de la compra: ${ totalPrice}</p>
                </div>
                <div style={{textAlign:'center'}}>
                    <button className={clases.botonelim} onClick={()=>eliminarTodo()}>Eliminar Carrito</button>
                    <Link  to="/Checkout" className={clases.enlaces}>Finalizar compra</Link>
                </div>
                </div>
            ):(
                <div style={{textAlign:'center'}}>
                    <h1 className={clases.parrafos}>Tu carrito está vacío</h1>
                    <Link  to="/" className={clases.parrafos}>Ve a por productos aqui!!</Link>
                </div>
                
            ) }
            
        </div>
            
    );
}

export default Cart;

