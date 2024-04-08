import { useEffect, useState } from "react"
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../services/firebase/firebaseConfig"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import clases from "../ItemDetail/ItemDetail.module.css"

const ItemDetailContainer =()=>{
    const [product, setProduct] =  useState(null)
    const [loading, setLoading] = useState(true); 

    const {itemId}  = useParams();
    
    useEffect(() => {
        const productDoc = doc(db, "productos", itemId)
    
        getDoc(productDoc)
        .then(queryDocumentSnapshot => {
            const data = queryDocumentSnapshot.data();
            const productAdapted = {id: queryDocumentSnapshot.id, ...data }
    
            setProduct(productAdapted)
        })
        .catch()
        .finally(()=> setLoading(false))
    }, [itemId]);
    


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
