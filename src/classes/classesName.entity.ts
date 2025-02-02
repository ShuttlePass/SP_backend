import { DefaultEntity } from 'src/entity/common.entity'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ClassesName extends DefaultEntity {
  @PrimaryGeneratedColumn()
  cn_idx: number

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  cn_name: string
}
