import PropTypes from "prop-types";
import styles from "./cardAppointment.module.css"
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2'

export default function CardAppointment({
  id,
  date,
  time,
  description,
  initialStatus,
}) {

  const [status, setStatus] = useState(initialStatus);

  const formattedDate = new Date(date).toLocaleDateString();

  const handleClick =  async (event) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: '¿Está seguro? ',
      text: 'Esta acción no se puede revertir',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar turno',
      cancelButtonText: 'No, mantener turno'
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
        setStatus(false);
        Swal.fire({
          title: '¡Cancelado!',
          text: 'Tu turno ha sido cancelado.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        console.log(response);
      } catch (error) {
        console.error("Error al cancelar turno", error);
        Swal.fire({
          title: 'Error!',
          text: `Error al cancelar turno: ${error.response?.data || error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      // Si el usuario decide no cancelar el turno
      Swal.fire({
        title: 'Cancelación abortada',
        text: 'Tu turno está seguro.',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
    
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <span><p>Fecha:</p> <p>{formattedDate}</p></span>
        <span><p>Hora:</p> <p>{time}</p></span>
        <span><p>Descripción:</p> <p>{description}</p></span>
        <span>
          <p>Estado:</p> 
          {status ? (
            <span className={styles.active}>Activo</span>
          ) : (
            <span className={styles.cancelled}>Cancelado</span>
          )}
        </span>
        {status ? (
          <span className={styles.cancelButton} onClick={handleClick}>Cancelar turno</span>
        ) : null}
      </div>
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
