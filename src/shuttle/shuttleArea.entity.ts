import { DefaultEntity } from 'src/entity/defaultEntity.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ShuttleArea extends DefaultEntity {
  @PrimaryGeneratedColumn()
  sa_idx: number

  @Column()
  shuttle_idx: number

  @Column()
  area_idx: number
}
