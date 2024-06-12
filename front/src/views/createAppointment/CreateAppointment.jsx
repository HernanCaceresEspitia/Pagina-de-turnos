import { useState } from "react";
import validateAppointment from "../../helpers/validateAppointment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./CreateAppointment.module.css";
import Swal from "sweetalert2";

function CreateAppointment() {
  const [input, setInput] = useState({
    date: "",
    time: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    date: "Debe ingresar una fecha",
    time: "Debe selccionar una hora",
    description: "Debe escribir una descripcion",
  });

  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

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
      const response = await axios.post("http://localhost:3000/appointments/schedule", {
        date: input.date,
          time: input.time,
          userId: userId,
          description: input.description,
      }
    );
    Swal.fire({
      title: 'Turno asignado exitosamente',
        text: `Turno ID: ${response.data.id}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    navigate(`/user/${userId}`);
    } catch (error) {
      console.error("Error al crear el turno", error);
      Swal.fire({
        title: 'Error al crear el turno',
        text: `${error.response?.data || error.message}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    setInput({
      date: "",
      time: "",
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
    <div className={styles.createAppointmentContainer}>
      <h1 className={styles.title}>Asigna tu turno</h1>
      <hr />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="date">Fecha:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={input.date}
            placeholder="01/01/2024"
            onChange={handleChange}
            className={styles.input}
          />
          <p className={styles.error}>{errors.date && errors.date}</p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="time">Hora:</label>
          <select
            id="time"
            name="time"
            value={input.time}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Selecciona una hora:</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <p className={styles.error}>{errors.time && errors.time}</p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Descripción:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={input.description}
            placeholder="Quiero mi muñeco con pantalones rosa"
            onChange={handleChange}
            className={styles.input}
          />
          <p className={styles.error}>
            {errors.description && errors.description}
          </p>
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

export default CreateAppointment;
