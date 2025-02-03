import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { us_level } from './user.dto'
import { DefaultEntity } from 'src/entity/defaultEntity.entity'

@Entity()
export class User extends DefaultEntity {
  @PrimaryGeneratedColumn()
  us_idx: number

  @Column({ type: 'varchar', length: 255, unique: true })
  us_id: string

  @Column({ type: 'varchar', length: 255 })
  us_password: string

  @Column({ type: 'enum', enum: ['manager', 'driver'], nullable: true })
  us_level: us_level

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  us_contact: string

  @Column({ type: 'varchar', length: 255 })
  us_name: string
}
