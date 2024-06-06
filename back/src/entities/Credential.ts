import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import User from "./User";

@Entity({ name: "credentials" })
class Credential {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  //* Relación 1:1 con User
  @OneToOne(() => User, (user) => user.credential)
  user!: User;
}

export default Credential;