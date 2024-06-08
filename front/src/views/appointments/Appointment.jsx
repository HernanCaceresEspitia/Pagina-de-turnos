import { useEffect, useState } from "react";
import CardAppointment from "../../components/cardAppointment/CardAppointment";
import axios from "axios";
const GETAPPOINTMENTSURL = "http://localhost:3000/appointments";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(GETAPPOINTMENTSURL)
      .then((response) => response.data)
      .then((appointmentsFromDB) => setAppointments(appointmentsFromDB));
  }, []);

  return (
    <div>
      <h1>Mis Turnos</h1>
      {appointments.map((appointment) => (
        <CardAppointment
          key={appointment.id}
          id={appointment.id}
          date={appointment.date}
          time={appointment.time}
          description={appointment.description}
          status={appointment.status}
        />
      ))}
    </div>
  );
}
