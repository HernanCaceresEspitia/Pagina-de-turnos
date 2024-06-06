import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import {
  createUserService,
  findUserByCredentialIdService,
  getAllUsersService,
  getUserByIdService,
} from "../services/usersServices";
import ICreateUserDto from "../interfaces/ICreateUserDto";
import ICreateCredentialDto from "../interfaces/ICreateCredentialDto";
import ICredential from "../interfaces/ICredential";
import { validateCredential } from "../services/credentialsServices";
import User from "../entities/User";
import Credential from "../entities/Credential";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsersService();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getUserById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user: User = await getUserByIdService(Number(id));
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const registerUser = async (
  req: Request<{}, {}, ICreateUserDto>,
  res: Response
) => {
  try {
    const { name, email, dob, nDni, description, username, password } =
      req.body;
    const newUser: User = await createUserService({
      name,
      email,
      dob,
      nDni,
      description,
      username,
      password,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const loginUser = async (
  req: Request<{}, {}, ICreateCredentialDto>,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const credential: Credential = await validateCredential({
      username,
      password,
    });
    const user: User | null = await findUserByCredentialIdService(credential.id);
    res.status(200).json({
      loggin: true,
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
