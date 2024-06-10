import axios from "axios";
import { useEffect, useState } from "react";
import CardAppointment from "../../components/cardAppointment/CardAppointment";
import { useSelector } from "react-redux";

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
