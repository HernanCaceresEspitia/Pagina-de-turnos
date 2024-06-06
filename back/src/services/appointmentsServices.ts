import Appointment from "../entities/Appointment";
import User from "../entities/User";
import IScheduleAppointmentDto from "../interfaces/IScheduleAppointment";
import { appointmentModel, userModel } from "../repositories";

//* SERVICIO PARA CREAR TURNO
export const scheduleAppointmentService = async (
  scheduleDto: IScheduleAppointmentDto
): Promise<Appointment> => {
  const user: User | null = await userModel.findOneBy({
    id: scheduleDto.userId,
  });
  if (!user) throw new Error("Usuario inexistente");
  const newAppointment: Appointment = appointmentModel.create({
    ...scheduleDto,
    user,
  });
  await appointmentModel.save(newAppointment);
  return newAppointment;
};

//* SERVICIO PARA TRAER TODOS LOS TURNOS
export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const allAppointments: Appointment[] = await appointmentModel.find();
  if (allAppointments.length === 0) throw Error("No hay turnos asignados");
  return allAppointments;
};

//* SERVICIO PARA TRAER UN TURNO ESPECÍFICO
export const getAppointmentByIdService = async (
  turnId: number
): Promise<Appointment> => {
  const appointment: Appointment | null = await appointmentModel.findOneBy({
    id: turnId,
  });
  if (!appointment) throw Error("Turno inexistente");
  return appointment;
};

//*SERVICIO PARA CANCELAR UN TURNO

export const cancelAppointmentService = async (
  turnId: number
): Promise<void> => {
  const appointment: Appointment | null = await appointmentModel.findOneBy({
    id: turnId,
  });
  if(appointment?.status === false) throw new Error ("Turno previamente cancelado.")
  if (!appointment) throw new Error("Turno inexistente.");
  appointment.status = false;
  await appointmentModel.save(appointment);
};
