import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/usersControllers";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", registerUser);
userRouter.put("/login", loginUser);

export default userRouter;
