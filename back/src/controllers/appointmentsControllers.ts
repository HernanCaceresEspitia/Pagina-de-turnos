//* GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
//* GET /appointment => Obtener el detalle de un turno específico.
//* POST /appointment/schedule => Agendar un nuevo turno.
//* PUT /appointment/cancel => Cambiar el estatus de un turno a “cancelled”.

import { Request, Response } from "express";

export const getAllAppointments = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Obtener el listado de todos los turnos de todos los usuarios",
  });
};

export const getAppointmentById = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Obtener el detalle de un turno específico" });
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Agendar un turno nuevo" });
};

export const cancelAppointment = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Cambiar el estatus de un turno a “cancelled”" });
};
