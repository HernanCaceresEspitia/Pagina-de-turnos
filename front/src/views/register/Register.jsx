import { useState } from "react";
import validateRegister from "../../helpers/validateRegister";
import axios from "axios";

function Register() {
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
      alert(`Registro exitoso. Bienvenido ${response.data.name}`);
    } catch (error) {
      console.log("Error al registrarse", error);
      alert(`Error al registrarse: ${error.response?.data || error.message}`);
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
    <div>
      <h1>Registro</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre de usuario</label>
          <input
            id="name"
            type="text"
            name="name"
            value={input.name}
            placeholder="Primer nombre y apellido"
            onChange={handleChange}
          />
          <p>{errors.name && errors.name}</p>
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="text"
            name="email"
            value={input.email}
            placeholder="example@mail.com"
            onChange={handleChange}
          />
          <p>{errors.email && errors.email}</p>
        </div>
        <div>
          <label htmlFor="dob">Fecha de nacimiento</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={input.dob}
            placeholder="01/01/2000"
            onChange={handleChange}
          />
          <p>{errors.dob && errors.dob}</p>
        </div>
        <div>
          <label htmlFor="nDni">Número de identificación</label>
          <input
            id="nDni"
            type="text"
            name="nDni"
            value={input.nDni}
            placeholder="XXX-XXX-XXX-XX"
            onChange={handleChange}
          />
          <p>{errors.nDni && errors.nDni}</p>
        </div>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            name="username"
            value={input.username}
            placeholder="Pepito1"
            onChange={handleChange}
          />
          <p>{errors.username && errors.username}</p>
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={input.password}
            placeholder="*******"
            onChange={handleChange}
          />
          <p>{errors.password && errors.password}</p>
        </div>

        <input type="submit" value="Enviar" disabled={isDisabled} />
      </form>
    </div>
  );
}

export default Register;
