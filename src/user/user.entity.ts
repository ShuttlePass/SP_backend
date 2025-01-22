import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  us_idx: number

  @Column({ type: 'varchar', length: 255, unique: true })
  us_id: string

  @Column({ type: 'varchar', length: 255 })
  us_password: string

  @Column({ type: 'enum', enum: ['manager', 'driver'], nullable: true })
  us_level: string

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  us_contact: string

  @Column({ type: 'varchar', length: 255 })
  us_name: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
