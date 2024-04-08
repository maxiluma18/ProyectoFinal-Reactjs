import clase from "./ItemListContainer.module.css"
import clases from "../ItemDetail/ItemDetail.module.css"
import  { useState,useEffect } from 'react'
import { getDocs, collection, query, where} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

const ItemListContainer =(props)=>{
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);

    const {categoriaId} =useParams()

    useEffect(() => {

        const productCollection = categoriaId ? query(collection(db, "productos"), where("categoria", "==", categoriaId) ) : collection(db, "productos")

    getDocs(productCollection)
        .then(querySnapshot =>{
        const productsAdapted = querySnapshot.docs.map(doc => {
            const data = doc.data()
            return {id: doc.id, ...data}
        })
        setProducts(productsAdapted)
        })
        .catch(error => console.error(error))
        .finally(()=> setLoading(false))
    
    }, [categoriaId]);
    
    if (loading) {
        return <p className={clases.parrafos}> Cargando productos...</p>;
    }
    return(
        <div>
            <h2 className={clase.hero}  >{props.greeting}</h2>
            <ItemList products={products} />
        </div>
        
    )
}

export default ItemListContainer