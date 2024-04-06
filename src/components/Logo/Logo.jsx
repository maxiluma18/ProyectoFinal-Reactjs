import logo from "./assets/logo.jpeg"
import clase from "./Logo.module.css";
import { Link } from "react-router-dom";

const Logo =()=>{
    return(
        <div>
            <Link to={"/"}><img className={clase.logo}   src={logo} alt="Logo Subaaton" /></Link>
        </div>
    )
}

export default Logo
