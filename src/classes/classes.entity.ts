import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Classes {
  @PrimaryGeneratedColumn()
  cl_idx: number

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  cl_name: string

  @Column({ type: 'time' })
  cl_start_at: string

  @Column({ type: 'time' })
  cl_end_at: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
