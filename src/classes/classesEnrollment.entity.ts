import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ClassesEnrollment {
  @PrimaryGeneratedColumn()
  ce_idx: number

  @Column()
  student_idx: number

  @Column()
  classes_idx: number

  @Column({ type: 'date' })
  ce_date: Date

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
