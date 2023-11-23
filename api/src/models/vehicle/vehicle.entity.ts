
import { MaxLength, MinLength } from 'class-validator'
import { Application } from 'src/models/application/application.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  vin: string

  @Column()
  year: string

  @Column()
  make: string

  @Column()
  model: string

  @ManyToOne(() => Application, (application) => application.vehicles)
  application: Application
}
