import { useState, createContext } from "react"


export const CartContext = createContext();

export const CartProvider =({children})=> {

    const [cart, setCart] = useState([])

  
    const addItem = (productToAdd) => {
        if(!isInCart(productToAdd.id)){
            setCart(prev => [... prev, productToAdd])
        }else{
        alert(`Ya esta ${productToAdd} en el carrito`)
        }
    }
    
  
    const isInCart =(id) => {
      return cart.some(prod => prod.id ===id)
    }

    const clearCart = () => {
      setCart([])
    }
  
    const removeItem = (id) => {
      const updatedCart = cart.filter(prod => prod.id !== id)
      setCart(updatedCart)
    }


    const getTotalQuantity = () => {
  
      let quantityAccumulator = 0
  
      cart.forEach(prod=>{
        quantityAccumulator += prod.quantity
      })
  
      return quantityAccumulator
    }
  
    

    
    const getTotalPrice = () => {
      let totalPriceAccumulator = 0
      
      cart.forEach(prod => {
        totalPriceAccumulator += prod.quantity * prod.precio
      })

      return totalPriceAccumulator

    }

    const totalPrice = getTotalPrice();
    const totalQuantity = getTotalQuantity();


   return (

    <CartContext.Provider value={{cart, addItem, totalQuantity, clearCart, isInCart, removeItem, totalPrice}}>
        {children}
    </CartContext.Provider>
   ) 
}
