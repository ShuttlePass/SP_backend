import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { DefaultEntity } from './common.entity'

@Entity()
export class Area extends DefaultEntity {
  @PrimaryGeneratedColumn()
  ar_idx: number

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  ar_name: string
}
