import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ShuttleTime extends DefaultEntity {
  @PrimaryGeneratedColumn()
  st_idx: number

  @Column({ type: 'time' })
  st_time: string

  @Column()
  st_type: number

  @Column()
  company_idx: number
}
