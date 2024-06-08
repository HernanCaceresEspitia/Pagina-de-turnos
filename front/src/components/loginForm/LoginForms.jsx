import { useState } from "react";
import validateUser from "../../helpers/validateUser";

function LoginForms() {
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
    setErrors(validateUser({
      ...input,
      [event.target.name]: event.target.value,
    }));
  };

  console.log(errors);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Datos enviados, nombre de usuario: ${input.username}, contraseña: ${input.password}`
    );
    setInput({
      username: "",
      password: "",
    });
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
          <p style={{color: "coral", fontSize: "0.8em"}}>{ errors.username ? errors.username : null }</p>
          
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
          <p style={{color: "coral", fontSize: "0.8em"}}>{ errors.password && errors.password }</p>
        </div>
        <input type="submit" value="Enviar" disabled={ errors.username || errors.password }/>
      </form>
    </div>
  );
}

export default LoginForms;
