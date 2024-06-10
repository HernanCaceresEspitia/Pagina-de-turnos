import { useState } from "react";
import validateAppointment from "../../helpers/validateAppointment";
import axios from "axios";

function CreateAppointment() {
  const [input, setInput] = useState({
    date: "",
    time: "",
    userId: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    date: "Debe ingresar una fecha",
    time: "Debe selccionar una hora",
    userId: "Debe seleccionar el usuario",
    description: "Debe escribir una descripcion",
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log(`Selected date: ${event.target.value}`);
    setErrors(
      validateAppointment({
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
        "http://localhost:3000/appointments/schedule",
        {
          date: input.date,
          time: input.time,
          userId: input.userId,
          description: input.description,
        }
      );
      alert(`Turno asignado exitosamente ${response.data.id}`);
    } catch (error) {
      console.error("Error al crear el turno", error);
      alert(
        `Error al crear el turno: ${error.response?.data || error.message}`
      );
    }
    setInput({
      date: "",
      time: "",
      userId: "",
      description: "",
    });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const isDisabled =
    Object.values(errors).some((error) => error !== "") ||
    Object.values(input).some((field) => field === "");

  return (
    <div>
      <h1>Asigna tu turno</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={input.date}
            placeholder="01/01/2024"
            onChange={handleChange}
          />
          <p>{errors.date && errors.date}</p>
        </div>
        <div>
          <label htmlFor="time">Hora:</label>
          <select
            id="time"
            name="time"
            value={input.time}
            onChange={handleChange}
          >
            <option value="">Selecciona una hora:</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
            <p>{errors.time && errors.time}</p>

        <div>
            <label htmlFor="userId">ID de usuario</label>
            <input
                id="userId"
                type="number"
                name="userId"
                value={input.userId}
                placeholder="X"
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="description">Descripción:</label>
            <input
                id="description"
                type="text"
                name="description"
                value={input.description}
                placeholder="Quiero mi muñeco con pantalones rosa"
                onChange={handleChange}
            />
            <p>{ errors.description && errors.description }</p>
        </div>
        <input type="submit" value="Enviar" disabled = {isDisabled}/>
        </div>
      </form>
    </div>
  );
}

export default CreateAppointment;
