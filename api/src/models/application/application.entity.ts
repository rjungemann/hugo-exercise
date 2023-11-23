
import { Address } from 'src/models/address/address.entity'
import { Vehicle } from 'src/models/vehicle/vehicle.entity'
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm'
import { IsAgeGated } from '../constraints/IsAgeGated';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @IsAgeGated()
  @Column({ nullable: true, type: 'timestamptz' })
  birthdate: Date

  @Column({ default: false })
  submitted: boolean;

  @OneToMany(() => Address, (address) => address.application, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  addresses!: Address[]

  @OneToMany(() => Vehicle, (vehicle) => vehicle.application, { eager: true, onDelete: 'CASCADE' })
  vehicles: Vehicle[]
}