import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/userSlice";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const userLogged = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.id);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "¿Desea cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "No, mantener sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        dispacth(logout());
        Swal.fire({
          title: "Sesión cerrada",
          text: "Ha cerrado sesión exitosamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Operación cancelada",
          text: "Su sesión sigue activa.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <Link to={"/"}>
          <img src={logo} alt="logo" className={styles.logoImage} />
        </Link>
      </div>
      <div className={styles.menuToggle} onClick={toggleMenu}></div>
      <div
        className={`${styles.linksSection} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <Link to={"/"}>
          <i className="fas fa-home"></i>
        </Link>
        {userLogged ? (
          <div className={styles.linksSection}>
            <Link to={"/setAppointment"}>Pide un turno</Link>
            <Link to={`/user/${userId}`}>Ver mis turnos</Link>
            <Link
              onClick={handleLogout}
              className={styles.loginButton}
            >
              Cerrar Sesión
            </Link>
          </div>
        ) : (
          <div>
            <Link to={"/login"} className={styles.loginButton}>
              Iniciar Sesión
            </Link>
          </div>
        )}
        <Link to={"/about"}>Acerca</Link>
        <Link to={"/contact"}>Contacto</Link>
      </div>
    </div>
  );
}
