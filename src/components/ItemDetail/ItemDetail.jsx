import ItemCount from "../ItemCount/ItemCount";
import clases from "./ItemDetail.module.css"
import { CartContext } from "../../context/CartContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const ItemDetail =({id, nombre, precio, img, categoria, stock})=>{
    const [quantity, setQuantity] = useState(0);
    const { addItem, isInCart } = useContext(CartContext);

    const handleOnAdd = (quantity)=>{
        const productoAlCarrito = {id, nombre, precio, img, quantity}
        setQuantity(quantity)

        addItem(productoAlCarrito); 

        if(isInCart(id)){
            Swal.fire({
                text:`El producto ${nombre} ya se encuentra en el carrito`,
                icon:'error',
                timer:4000,
                timerProgressBar:true,
                background:"White"
            })
        }else{
            Swal.fire({
                text:`Se ha agregado ${quantity} unidades de ${nombre} a tu carrito`,
                icon:'success',
                timer:4000,
                timerProgressBar:true,
                background:"8d5f26"
            })
        }
    }

    return(
        <article className={clases.container}>
            <h3 className={clases.parrafos}>Categoria:{categoria}</h3>
            <h2 className={clases.parrafos}>{nombre}</h2>
            <img src={img} className={clases.img} />
            <h2 className={clases.parrafos}>${precio}</h2>
            <footer>
                {!isInCart(id) ? (
                        <ItemCount onAdd={handleOnAdd} stock={stock} />
                    ) : (
                        <div>
                            <Link to='/'  className={clases.enlaces}>Seguir comprando</Link>
                            <Link to='/cart' className={clases.enlaces}>Finalizar compra</Link>
                        </div>
                    )
                }
            </footer>
        </article>
    )
}



export default  ItemDetail;