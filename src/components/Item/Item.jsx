import { Link } from "react-router-dom";
import clases from "./Item.module.css"

const Item =({id, nombre, precio, img, stock})=>{
    const hayStock = stock > 0 ? false : true;

    return(
        
        <article>
            {hayStock ? (
                <div  className={clases.container}>
                    <h2 className={clases.parrafos}>{nombre}</h2>
                    <img src={img} className={clases.img} />
                    <p className={clases.parrafos}>No hay stock</p>
                    <Link to={`/item/${id}`} className={clases.enlaces}>Ver Detalles</Link>
                </div>
            ):(
                <div  className={clases.container}>
                    <h2 className={clases.parrafos}>{nombre}</h2>
                    <img src={img} className={clases.img} />
                    <h2 className={clases.parrafos}>${precio}</h2>
                    <Link to={`/item/${id}`} className={clases.enlaces}>Ver Detalles</Link>
                </div>
            )
        } 
        </article>
    )
}

export default  Item;