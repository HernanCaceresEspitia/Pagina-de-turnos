interface ICreateUserDto {
    id?: number;
    name: string;
    email: string;
    dob: string;
    nDni: number;
    description: string;
    credentialsId?: number;
    username: string;
    password: string;
}

export default ICreateUserDto;