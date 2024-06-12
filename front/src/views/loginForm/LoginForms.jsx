import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateUser from "../../helpers/validateUser";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";
import styles from "./LoginForms.module.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => {
    toast.error('Usuario o contraseña incorrectos', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      });
  }
  
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "Debe ingresar un nombre de usuario",
    password: "Debe ingresar una contraseña",
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateUser({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  console.log(errors);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("http://localhost:3000/users/login", {
        username: input.username,
        password: input.password,
      });
      const userName = response.data.user.name;
      dispatch(login({ id: response.data.user.id, name: userName, notification: `Bienvenido ${userName}` }));
      navigate("/");
    } catch (error) {
      console.error("Hubo un error al iniciar sesión", error);
      notify();
      navigate("/login");
    }
    setInput({
      username: "",
      password: "",
    });
  };

  return (
    <div className={styles.loginContainer}>
      <ToastContainer />
      <h1 className={styles.loginTitle}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          {" "}
          <label htmlFor="username" className={styles.formLabel}>
            Nombre de usuario:{" "}
          </label>{" "}
          <input
            id="username"
            type="text"
            name="username"
            value={input.username}
            placeholder="Ingresa tu nombre de usuario"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>
            {errors.username && errors.username}{" "}
          </p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Contraseña:{" "}
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={input.password}
            placeholder="********"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>
            {errors.password && errors.password}
          </p>
        </div>
        <input
          id="Enviar"
          type="submit"
          value="Enviar"
          disabled={errors.username || errors.password}
          className={styles.submitButton}
        />
      </form>
      <p>
        ¿No estás registrado? Has click{" "}
        <Link to={"/register"} className={styles.linkText}>
          aquí
        </Link>
      </p>
    </div>
  );
}

export default LoginForms;
