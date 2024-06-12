import axios from "axios";
import { useEffect, useState } from "react";
import CardAppointment from "../../components/cardAppointment/CardAppointment";
import { useSelector } from "react-redux";
import styles from './userAppointment.module.css'
import { Link } from "react-router-dom";



export default function UserAppointments() {
  const [user, setUser] = useState({});
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user appointments:", error);
      }
    };

    fetchUserAppointments();
  }, [id]); 

  if (!user) {
    return <div>Loading...</div>;
  }

  const sortedAppointments = user.appointments ? [...user.appointments].sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

  return (
    <div className={styles.userAppointmentsContainer}>
      <h1 className={styles.title}>Mis Turnos</h1>
      <div className={styles.appointmentsGrid}>
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((appointment) => (
            <CardAppointment
              key={appointment.id}
              id={appointment.id}
              date={appointment.date}
              time={appointment.time}
              description={appointment.description}
              initialStatus={appointment.status}
            />
          ))
        ) : (
          <p className={styles.loading}>Aun no tienes turnos asiganos. ¡Crea uno <Link to={"/setAppointment"}>aquí!</Link></p>
        )}
      </div>
    </div>
  );
}
