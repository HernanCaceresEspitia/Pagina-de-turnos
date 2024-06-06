import { Request, Response } from "express";
import Appointment from "../entities/Appointment";
import { cancelAppointmentService, getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService } from "../services/appointmentsServices";


//* OBTENER TODOS LOS TURNOS
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const allAppointments: Appointment[] = await getAllAppointmentsService()
    res.status(200).json(allAppointments);  
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
};

//*OBTENER TURNO POR ID
export const getAppointmentById = async (
  req: Request< {id: string }, {}, {}>,
  res: Response
) => {
  const { id: turnId } = req.params;
  try {
    const appointment = await getAppointmentByIdService(Number(turnId));
    res.status(200).json(appointment)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
};

//*CREAR TURNO 
export const scheduleAppointment = async (req: Request, res: Response) => {
  const { date, time, userId, description } = req.body;
  try {
    const newAppointment: Appointment = await
    scheduleAppointmentService({
      date,
      time,
      userId,
      description
    });
    res.status(201).json(newAppointment)
  } catch (error: any) {
    res.status(400).json( { error: error.message });
  }
};

//* CANCELAR TURNO
export const cancelAppointment = async (req: Request<{ id: string}, {}, {}>, res: Response) => {
  const { id: turnId } = req.params;
  try {
    const turnIdNumber = parseInt(turnId, 10);
    if (isNaN(turnIdNumber)) {
      throw new Error("Invalid turnId");
    }
    await cancelAppointmentService(turnIdNumber);
    res.status(200).json({ message: "Turno cancelado" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
