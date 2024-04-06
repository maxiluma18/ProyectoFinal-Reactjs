import { useState } from "react"
import clases from "./ItemCount.module.css"

const ItemCount = ({initial =1, stock, onAdd}) =>{
    const [count, setCount] = useState(initial)

    const decrement = ()=>{
        if(count > 1){
            setCount(prev => prev - 1)
        }
    }

    const increment = ()=>{
        if(count < stock){
            setCount(prev => prev + 1)
        }
    }

    return(
        <article>
            <h3 className={clases.num}>{count}</h3>
            <button onClick={decrement} className={clases.boton}>-</button>
            <button onClick={()=> onAdd(count)} className={clases.boton}>Agregar productos al carrito</button>
            <button onClick={increment } className={clases.boton}>+</button>
        </article>
    )
}

export default  ItemCount;