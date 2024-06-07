import { useState } from "react"
import allAppointments from "../../helpers/appointmentsHelpers";
import CardAppointment from "../../components/cardAppointment/cardAppointment";

export default function Appointments () {
    
    const [appointments, setAppointments] = useState(allAppointments);
    
    console.log(setAppointments);

    return (
        <div>
            <h1>Mis Turnos</h1>
            {
                appointments.map(appointment => (
                    <CardAppointment 
                        key={appointment.id}
                        id = {appointment.id}
                        date = {appointment.date}
                        time = {appointment.time} 
                        description = {appointment.description} 
                        status = {appointment.status}
                    />
                ))
            }
        </div>
    )
}