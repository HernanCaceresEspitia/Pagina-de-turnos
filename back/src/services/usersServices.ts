import Credential from "../entities/Credential";
import User from "../entities/User";
import ICreateUserDto from "../interfaces/ICreateUserDto";
import { userModel } from "../repositories";
import { createCredentialService } from "./credentialsServices";

export const getAllUsersService = async (): Promise<User[]> => {
  const allUsers: User[] = await userModel.find({
    relations: {
      appointments: true,
    },
  });
  return allUsers;
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const user: User | null = await userModel.findOne({
    where: { id },
    relations: ["appointments"]
  })
  if(!user) throw new Error ("Usuario no encontrado");
  return user;
};

export const createUserService = async (createUserDto: ICreateUserDto) => {
  //* Creamos usuario
  const newUser: User = userModel.create(createUserDto);
  await userModel.save(newUser);
  //* Crear credencial
  const newCredential: Credential = await createCredentialService({
    username: createUserDto.username,
    password: createUserDto.password,
  });

  //*Vincular usuario y credenciales
  newUser.credential = newCredential;
  await userModel.save(newUser);
  
  return newUser;
  };

export const findUserByCredentialIdService = async (credentialId: number) => {
  const user: User | null = await userModel.findOneBy({
    credential: { id: credentialId }
  });
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};
