import clase from "./ItemListContainer.module.css"
import  { useState,useEffect } from 'react'
import { getProducts, getProductsByCategory } from "../../asyncMock"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

const ItemListContainer =(props)=>{
    const [products, setProducts] = useState([])

    const {categoriaId} =useParams()

    useEffect(()=>{
        const funcionAsincronica = categoriaId ? getProductsByCategory : getProducts

        funcionAsincronica(categoriaId)
            .then(result =>{
                setProducts(result)
            })    
    }, [categoriaId])
    
    return(
        <div>
            <h2 className={clase.hero}  >{props.greeting}</h2>
            <ItemList products={products} />
        </div>
        
    )
}

export default ItemListContainer