import { UUIDV4 } from 'sequelize';
import {
  Default,
  PrimaryKey,
  Table,
  Model,
  Column,
  AllowNull,
  Unique,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @Column
  middleName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @Column
  secundaryEmail: string;

  @AllowNull(false)
  @Column
  phoneNumber: string;

  @Column
  secundaryPhoneNumber: string;

  @Column
  homeAddress: string;

  @Column
  city: string;

  @AllowNull(false)
  @Column
  password: string;
}
