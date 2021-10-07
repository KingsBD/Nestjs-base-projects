import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  secundaryEmail: string;

  @Column()
  phoneNumber: string;

  @Column()
  secundaryPhoneNumber: string;

  @Column()
  homeAddress: string;

  @Column()
  city: string;

  @Column()
  password: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
