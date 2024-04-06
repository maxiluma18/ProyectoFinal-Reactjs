import Logo from "../Logo/Logo.jsx";
import CartWidget from "../CartWidget/CartWidget.jsx";
import clases from "./NavBar.module.css" 
import { Link } from "react-router-dom";

const NavBar =()=>{
    return(
        <nav className={clases.nav}>
            <Logo />
            <ul className={clases.list} ><Link to={"/categoria/Nuevo"} className={clases.enlaces} >Nuevo</Link></ul> 
            <ul className={clases.list} ><Link to={"/categoria/Destacados"} className={clases.enlaces}>Destacados</Link></ul>
            <ul className={clases.list} ><Link to={"/categoria/Electronica"} className={clases.enlaces}>Electronica</Link></ul>
            <CartWidget />
        </nav>
    )
}

export default NavBar