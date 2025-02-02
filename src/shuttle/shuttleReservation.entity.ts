import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ShuttleReservation extends DefaultEntity {
  @PrimaryGeneratedColumn()
  sr_idx: number

  @Column()
  shuttle_idx: number

  @Column()
  shuttle_time_idx: number

  @Column({ nullable: true })
  sr_meet_time: string

  @Column()
  sr_meet_date: string

  @Column()
  student_idx: number

  @Column({ type: 'varchar', length: 255 })
  sr_address: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  sr_address_memo: string

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  sr_address_x: number

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  sr_address_y: number

  @Column({ type: 'tinyint' })
  sr_state: number
}
