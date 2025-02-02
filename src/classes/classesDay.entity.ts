import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ClassesDay extends DefaultEntity {
  @PrimaryGeneratedColumn()
  cd_idx: number

  @Column()
  classes_idx: number

  @Column({
    type: 'enum',
    enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  })
  cd_day: string
}
