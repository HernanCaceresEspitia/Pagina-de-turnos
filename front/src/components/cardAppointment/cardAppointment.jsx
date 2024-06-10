import PropTypes from "prop-types";
import styles from "./cardAppointment.module.css"
import axios from "axios";
import { useState } from "react";
export default function CardAppointment({
  id,
  date,
  time,
  description,
  initialStatus,
}) {

  const [status, setStatus] = useState(initialStatus);

  const formattedDate = new Date(date).toLocaleDateString();

  date = new Date(date);

  const handleClick =  async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
      setStatus(false)
      alert(`Cancelación de turno: ${response.data.date} exitoso`);
    } catch (error) {
      console.error("Error al cancelar turno", error)
      alert(`Error al cancelar turno: ${error.response?.data || error.message}`)
    }
    
  };

  return (
    <div className={styles.mainContainer}>
      <span>ID de Turno: {id}</span>
      <br />
      <span>Fecha: {formattedDate}</span>
      <br />
      <span>Hora: {time}</span>
      <br />
      <span>Descripción :{description}</span>
      <br />
      <span>
        Estado:{" "}
        { status ? (
          <span className={styles.active} onClick={handleClick}>Activo</span>
        ) : (
          <span className={styles.cancelled}>Cancelado</span>
        )}
      </span>
    </div>
  );
}

CardAppointment.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  initialStatus: PropTypes.bool.isRequired,
};
