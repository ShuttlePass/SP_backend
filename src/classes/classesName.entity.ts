import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ClassesName {
  @PrimaryGeneratedColumn()
  cn_idx: number

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  cn_name: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
