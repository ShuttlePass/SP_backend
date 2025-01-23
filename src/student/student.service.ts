import { Injectable } from '@nestjs/common'
import { successJson } from 'src/common/common.service'
import { StudentRepository } from './student.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  async create(data: any) {
    if (!data) {
      throw new CustomException(returnInfos.BackEnd)
    }
    return successJson('요청 성공', data)
  }
}
