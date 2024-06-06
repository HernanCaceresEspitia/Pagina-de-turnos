import Credential from "../entities/Credential";
import ICreateCredentialDto from "../interfaces/ICreateCredentialDto";
import IValidateCredentialDto from "../interfaces/IValidateCredentialDto";
import { credentialModel } from "../repositories";

export const createCredentialService = async (
  createCredentialDto: ICreateCredentialDto
): Promise<Credential> => {
  const newCredential: Credential =
    await credentialModel.create(createCredentialDto);
  await credentialModel.save(newCredential);
  return newCredential;
};

export const validateCredential = async (
  validateCredentialDto: IValidateCredentialDto
): Promise<Credential> => {
  const { username, password } = validateCredentialDto;
  const foundCredential: Credential | null = await credentialModel.findOneBy({
    username,
  });
  if (!foundCredential) throw new Error("Credenciales incorrectas");
  if (password !== foundCredential?.password)
    throw new Error("Credenciales incorrectas");
  return foundCredential;
};
