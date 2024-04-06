import { Link } from "react-router-dom";
import clases from "./Item.module.css"

const Item =({id, nombre, precio, img})=>{
    return(
        <article className={clases.container}>
            <h2 className={clases.parrafos}>{nombre}</h2>
            <img src={img} className={clases.img} />
            <h2 className={clases.parrafos}>${precio}</h2>
            <Link to={`/item/${id}`} className={clases.enlaces}>Ver Detalles</Link>
        </article>
    )
}

export default  Item;