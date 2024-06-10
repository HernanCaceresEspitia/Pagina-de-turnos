export default function validateAppointment(newAppointment) {
    const errors = {};
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);  // Establece la hora a 00:00:00

    if (!newAppointment.date) {
        errors.date = "Debe ingresar una fecha";
    } else {
        const appointmentDate = new Date(newAppointment.date);
        appointmentDate.setHours(0, 0, 0, 0);  // Establece la hora a 00:00:00

        // Válida que el turno no sea en una fecha anterior a la actual
        if (appointmentDate < currentDate) {
            errors.date = "No puede asignarse turno en días anteriores";
        }

        // Válida que no se pueda crear un turno con más de un mes de antelación
        const maxDate = new Date(currentDate);
        maxDate.setMonth(maxDate.getMonth() + 1);
        if (appointmentDate > maxDate) {
            errors.date = "El máximo plazo para crear un turno es 1 mes a partir de la fecha";
        }

        // Válida si el turno es un domingo
        if (appointmentDate.getDay() === 6) {
            errors.date = "No se puede crear un turno un domingo";
        }
        const fecha = appointmentDate.getDay();
        console.log(fecha);
    }

    if (!newAppointment.time) {
        errors.time = "Debe escoger un horario de atención";
    } else {
        const [hours, minutes] = newAppointment.time.split(":").map(Number);
        const timeInMinutes = hours * 60 + minutes;
        const minTime = 9 * 60;
        const maxTime = 18 * 60;

        if (timeInMinutes < minTime || timeInMinutes > maxTime) {
            errors.time = "La hora debe estar entre las 09:00 y las 18:00";
        }
    }

    if (!newAppointment.userId) {
        errors.userId = "Debe seleccionar un usuario";
    }

    if (!newAppointment.description) {
        errors.description = "Debe dejar una descripción";
    }

    return errors;
}


