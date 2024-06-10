import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardAppointment from "../../components/cardAppointment/CardAppointment";

export default function UserAppointments() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((response) => response.data)
      .then((userAppointments) => setUser(userAppointments))
      .catch((error) => console.error("Error fetching user appointments:", error));

    return () => {
      setUser({});
    };
  }, [id]);

  return (
   <div>
    <h1>Mis Turnos</h1>
    {user.appointments ? (
        user.appointments.map((appointment) => (
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
        <p>Cargando turnos...</p>
    )}
   </div>
  );
}
