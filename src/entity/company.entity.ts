import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  co_idx: number

  @Column({ type: 'varchar', length: 255, unique: true })
  co_name: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
