import { BeforeInsert, BeforeUpdate, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as moment from 'moment-timezone'

@Entity()
export class DefaultEntity {
  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date

  @BeforeInsert()
  @BeforeUpdate()
  setTimestamps() {
    const currentDate = moment().tz('Asia/Seoul').toDate()
    if (!this.created_at) {
      this.created_at = currentDate // created_at이 없으면 현재시간을 설정
    }
    this.updated_at = currentDate // 항상 update될 때는 현재시간
  }
}
