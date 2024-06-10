import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../slices/userSlice'

export default function Navbar() {

  const dispacth = useDispatch();
  const userLogged = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.id);

  const handleLogout = () => {
    dispacth(logout());
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={styles.linksSection}>
        <Link to={"/"}>HOME</Link>
        {userLogged ? (
          <div className={styles.linksSection}>
            <Link to={"/setAppointment"}>Pide un turno</Link>
            <Link to={`/user/${userId}`}>Ver mis turnos</Link>
            <Link to={"/"} onClick={handleLogout}>
              Cerrar Sesion
            </Link>
          </div>
        ) : (
          <div>
            <Link to={"/login"}>INICIAR SESIÓN</Link>
          </div>
        )}
        <span>ACERCA DE</span>
        <span>CONTACTO</span>
      </div>
    </div>
  );
}
