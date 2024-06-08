import { Router } from "express";
import {
  cancelAppointment,
  getAllAppointments,
  getAppointmentById,
  scheduleAppointment,
} from "../controllers/appointmentsControllers";
import validateAppointmentMiddleware from "../middlewares/validateAppointment";

const appointmentsRouter = Router();

appointmentsRouter.get("/", getAllAppointments);
appointmentsRouter.get("/:id", getAppointmentById);
appointmentsRouter.post("/schedule", validateAppointmentMiddleware, scheduleAppointment);
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;
