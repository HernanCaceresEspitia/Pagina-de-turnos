import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./navbar.module.css"

export default function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={styles.linksSection}>
        <Link to={"/home"}>HOME</Link>
        <Link to={"/login"}>INICIAR SESIÓN</Link>
        <span>ACERCA DE</span>
        <span>CONTACTO</span>
      </div>
    </div>
  );
}
