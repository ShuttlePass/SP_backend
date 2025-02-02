import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ShuttleReservationEnrollment extends DefaultEntity {
  @PrimaryGeneratedColumn()
  re_idx: number

  @Column()
  shuttle_reservation_idx: number

  @Column()
  classes_enrollment_idx: number
}
