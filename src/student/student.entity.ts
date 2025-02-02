import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Student extends DefaultEntity {
  @PrimaryGeneratedColumn()
  st_idx: number

  @Column()
  company_idx: number

  @Column()
  area_idx: number

  @Column({ type: 'varchar', length: 255 })
  st_name: string

  @Column({ type: 'varchar', length: 255 })
  st_contact: string

  @Column({ type: 'varchar', length: 255 })
  st_address: string

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  st_address_x?: number

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  st_address_y?: number
}
