import cart from "./assets/cart.png"
import clase from "./CartWidget.module.css";
const CartWidget =()=>{
    return(
        <div className={clase.container} >
            <p className={clase.num} >0</p>
            <img className={clase.cart}  src={cart} alt="Carrito de compras" />
        </div>
    )
}

export default CartWidget