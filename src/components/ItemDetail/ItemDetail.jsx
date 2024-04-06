import ItemCount from "../ItemCount/ItemCount";
import clases from "./ItemDetail.module.css"

const ItemDetail =({nombre, precio, img, categoria, stock})=>{
    return(
        <article className={clases.container}>
            <h3 className={clases.parrafos}>Categoria:{categoria}</h3>
            <h2 className={clases.parrafos}>{nombre}</h2>
            <img src={img} className={clases.img} />
            <h2 className={clases.parrafos}>${precio}</h2>
            <ItemCount stock={stock}/>
        </article>
    )
}

export default  ItemDetail;