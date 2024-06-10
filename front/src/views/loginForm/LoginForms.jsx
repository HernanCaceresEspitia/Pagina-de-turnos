import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateUser from "../../helpers/validateUser";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginForms() {
  const navigate = useNavigate();

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
      alert(`Login exitoso: ${response.data.username}`);
    } catch (error) {
      console.error("Hubo un error al iniciar sesión", error);
      alert(
        `Error al iniciar sesión: ${error.response?.data || error.message}`
      );
    }
    setInput({
      username: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario: </label>
          <input
            id="username"
            type="text"
            name="username"
            value={input.username}
            placeholder="Ingresa tu nombre de usuario"
            onChange={handleChange}
          />
          <p style={{ color: "coral", fontSize: "0.8em" }}>
            {errors.username ? errors.username : null}
          </p>
        </div>
        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={input.password}
            placeholder="********"
            onChange={handleChange}
          />
          <p style={{ color: "coral", fontSize: "0.8em" }}>
            {errors.password && errors.password}
          </p>
        </div>
        <input
          type="submit"
          value="Enviar"
          disabled={errors.username || errors.password}
        />
      </form>
      <p>¿No estás registrado? Has click <Link to={"/register"}>aquí</Link></p> 
    </div>
  );
}

export default LoginForms;
