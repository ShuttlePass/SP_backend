import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  ar_idx: number

  @Column()
  company_idx: number

  @Column({ type: 'varchar', length: 255 })
  ar_name: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
