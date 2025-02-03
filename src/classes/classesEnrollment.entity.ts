import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ClassesEnrollment extends DefaultEntity {
  @PrimaryGeneratedColumn()
  ce_idx: number

  @Column()
  student_idx: number

  @Column()
  classes_day_idx: number

  @Column({ type: 'date' })
  ce_date: string
}
