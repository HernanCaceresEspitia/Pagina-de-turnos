import PropTypes from "prop-types";
import styles from "./cardAppointment.module.css"
export default function CardAppointment({
  id,
  date,
  time,
  description,
  status,
}) {
  date = new Date(date);
  const formatDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()}`;

  const handleClick = () => {
    alert(`¿Desea cancelar el turno del día ${formatDate} a las ${time}?`);
  };

  return (
    <div className={styles.mainContainer}>
      <span>ID de Turno: {id}</span>
      <br />
      <span>Fecha: {formatDate}</span>
      <br />
      <span>Hora: {time}</span>
      <br />
      <span>Descripción :{description}</span>
      <br />
      <span>
        Estado:{" "}
        {status === true ? (
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
  status: PropTypes.bool.isRequired,
};
