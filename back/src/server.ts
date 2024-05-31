import express from "express";
import morgan from "morgan";
import userRouter from "./routes/userRoutes";
import appointmentsRouter from "./routes/appointmentsRoutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/users", userRouter);
app.use("/appointments", appointmentsRouter);

export default app;
