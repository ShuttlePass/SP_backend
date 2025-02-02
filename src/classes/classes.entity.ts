import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Classes {
  @PrimaryGeneratedColumn()
  cl_idx: number

  @Column()
  classes_name_idx: number

  @Column()
  cl_max_num: number

  @Column({ type: 'time' })
  cl_start_at: string

  @Column({ type: 'time' })
  cl_end_at: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
