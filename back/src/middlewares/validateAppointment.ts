import { Request, Response, NextFunction } from "express";

const validateAppointmentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, time } = req.body;

  //* Validar si la fecha y la hora existen
  if (!date || !time) {
    return res
      .status(400)
      .json({ error: "Fecha y hora del turno son requeridas" });
  }

  //* Convertir la fecha y la hora a un objeto Date
  const appointmentDate = new Date(`${date}T${time}:00`);

  //* Validar si la fecha es válida
  if (isNaN(appointmentDate.getTime())) {
    return res
      .status(400)
      .json({ error: "Fecha y hora del turno no son válidas" });
  }

  //* Obtener el día de la semana (0: domingo, 1: lunes, ..., 6: sábado)
  const dayOfWeek = appointmentDate.getDay();
  if (dayOfWeek === 0) {
    return res
      .status(400)
      .json({ error: "No se permiten turnos los domingos" });
  }

  //* Validar la hora del turno
  const hour = appointmentDate.getHours();
  if (hour < 9 || hour >= 18) {
    return res
      .status(400)
      .json({ error: "El turno debe ser entre las 9 a.m. y las 6 p.m." });
  }

  //* Obtener la fecha y hora actual
  const now = new Date();

  //* Validar si el turno es en un día anterior
  if (appointmentDate < now) {
    return res
      .status(400)
      .json({ error: "No se permiten turnos en días anteriores" });
  }

  //* Validar si el turno es con más de un mes de anticipación
  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(now.getMonth() + 1);

  if (appointmentDate > oneMonthLater) {
    return res
      .status(400)
      .json({
        error: "No se permiten turnos con más de un mes de anticipación",
      });
  }

  next();
};

export default validateAppointmentMiddleware;
