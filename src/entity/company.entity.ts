import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { DefaultEntity } from './common.entity'
@Entity()
export class Company extends DefaultEntity {
  @PrimaryGeneratedColumn()
  co_idx: number

  @Column({ type: 'varchar', length: 255, unique: true })
  co_name: string
}
