  import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import Credential from "./Credential";
  import Appointment from "./Appointment";

  @Entity({ name: "users" })
  class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    dob!: string;

    @Column()
    nDni!: number;

    //* Relación 1:1 con Credential
    @OneToOne(() => Credential, (credential) => credential.user)
    @JoinColumn()
    credential!: Credential;

    //* User 1:N Appointment
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments!: Appointment[];
  }

  export default User;

