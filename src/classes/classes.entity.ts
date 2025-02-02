import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Classes extends DefaultEntity {
  @PrimaryGeneratedColumn()
  cl_idx: number

  @Column()
  classes_name_idx: number

  @Column({ type: 'time' })
  cl_start_at: string

  @Column({ type: 'time' })
  cl_end_at: string
}
