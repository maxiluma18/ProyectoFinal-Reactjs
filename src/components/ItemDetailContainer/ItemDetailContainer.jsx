import { useEffect, useState } from "react"
import { getProductById } from "../../asyncMock"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import clases from "../ItemDetail/ItemDetail.module.css"

const ItemDetailContainer =()=>{
    const [product, setProduct] =  useState(null)
    const [loading, setLoading] = useState(true); 

    const {itemId}  = useParams();
    
    useEffect(()=>{
        getProductById(itemId)
            .then(result=>{
                setProduct(result);
                setLoading(false);
            })
    }, [itemId])


    if (loading) {
        return <p className={clases.parrafos}> Cargando producto...</p>;
    }

    return (
        <main>
            <h1 style={{textAlign:"center", textTransform:"uppercase", color:" #8d5f26"}}>Detalle de producto</h1>
            <ItemDetail {...product}/>
        </main>
    );
}

export default ItemDetailContainer;
