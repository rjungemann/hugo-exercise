
import { MaxLength, MinLength } from 'class-validator'
import { Application } from 'src/models/application/application.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  @MinLength(2, { message: 'state is too short' })
  @MaxLength(2, { message: 'state is too long' })
  state: string;

  @Column()
  @MinLength(5, { message: 'zipcode is too short' })
  @MaxLength(5, { message: 'zipcode is too long' })
  zipcode: string;

  @ManyToOne(() => Application, (application) => application.addresses)
  application: Application
}