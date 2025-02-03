import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { DefaultEntity } from 'src/entity/defaultEntity.entity'

@Entity()
export class Shuttle extends DefaultEntity {
  @PrimaryGeneratedColumn()
  sh_idx: number

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  sh_name: string

  @Column()
  driver_idx: number

  @Column({ type: 'tinyint' })
  sh_state: number

  @Column()
  sh_max_cnt: number
}
