import { useState } from "react";
import validateRegister from "../../helpers/validateRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"

function Register() {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    dob: "",
    nDni: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "Debe ingresar un nombre y apellido",
    email: "Debe ingresar un email",
    dob: "Debe ingresar su fecha de nacimiento",
    nDni: "Debe ingresar su número de identificación",
    username: "Debe ingresar un nombre de usuario",
    password: "Debe ingresar una contraseña",
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateRegister({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };
  console.log(errors);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          name: input.name,
          email: input.email,
          dob: input.dob,
          nDni: input.nDni,
          username: input.username,
          password: input.password,
        }
      );
      navigate("/login", { state: { message: `¡Registro exitoso!. Bienvenido ${response.data.name}` } });
    } catch (error) {
      console.log("Error al registrarse", error);
      alert(`Error al registrarse: ${error.response?.data.message || error.message}`);
    }
    setInput({
      name: "",
      email: "",
      dob: "",
      nDni: "",
      username: "",
      password: "",
    });
  };

  const isDisabled =
    Object.values(errors).some((error) => error !== "") ||
    Object.values(input).some((field) => field === "");

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>¡Regístrate!</h1>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className="formGroup">
          <label htmlFor="name" className={styles.formLabel}>
            Nombre de usuario
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={input.name}
            placeholder="Primer nombre y apellido"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>{errors.name && errors.name}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Correo electrónico
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={input.email}
            placeholder="example@mail.com"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>{errors.email && errors.email}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dob" className={styles.formLabel}>
            Fecha de nacimiento
          </label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={input.dob}
            placeholder="01/01/2000"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>{errors.dob && errors.dob}</p>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nDni" className={styles.formLabel}>
            Número de identificación
          </label>
          <input
            id="nDni"
            type="text"
            name="nDni"
            value={input.nDni}
            placeholder="XXX-XXX-XXX-XX"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>{errors.nDni && errors.nDni}</p>
        </div>
        <div className="formGroup">
          <label htmlFor="username" className={styles.formLabel}>
            Nombre de usuario
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={input.username}
            placeholder="Pepito1"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>{errors.username && errors.username}</p>
        </div>
        <div className="formGroup">
          <label htmlFor="password" className={styles.formLabel}>
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={input.password}
            placeholder="*******"
            onChange={handleChange}
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>{errors.password && errors.password}</p>
        </div>
        <input
          type="submit"
          value="Enviar"
          disabled={isDisabled}
          className={styles.submitButton}
        />
      </form>
    </div>
  );
}

export default Register;
