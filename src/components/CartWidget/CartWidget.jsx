import cart from "./assets/cart.png"
import clase from "./CartWidget.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartWidget =()=>{
    const { totalQuantity } = useContext(CartContext)

    return(
        <div className={totalQuantity===0 ? clase.hidden : clase.noHidden} >
            <p className={clase.num} >{totalQuantity}</p>
            <Link to="/cart">
                <img className={clase.cart}  src={cart} alt="Carrito de compras" /> 
            </Link>
            
        </div>
    )
}

export default CartWidget