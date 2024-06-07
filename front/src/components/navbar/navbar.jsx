import logo from "../../assets/logo.png";
import styles from "./navbar.module.css"

export default function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={styles.linksSection}>
        <span>HOME</span>
        <span>RESERVAR</span>
        <span>ACERCA DE</span>
        <span>CONTACTO</span>
      </div>
    </div>
  );
}
