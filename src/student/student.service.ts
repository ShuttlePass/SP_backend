import { Injectable } from '@nestjs/common'
import { successJson, successListJson } from 'src/common/common.service'
import { StudentRepository } from './student.repository'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { CreateStudentDto, StudentFilterDto } from './student.dto'
import { JwtPayload } from 'src/common/auth/jwt.strategy'
import { AreaRepository } from 'src/entity/area.repository'

@Injectable()
export class StudentService {
  constructor(
    private studentRepository: StudentRepository,
    private areaRepository: AreaRepository,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto, user: JwtPayload) {
    createStudentDto.company_idx = user.company_idx
    // area_idx company_idx에 해당되는앤지 확인
    const area = await this.areaRepository.findOneByArIdxAndCompanyIdx(
      createStudentDto.area_idx,
      createStudentDto.company_idx,
    )
    if (!area) {
      throw new CustomException(returnInfos.BadRequest, 'area_idx 이상')
    }
    // 같은 company_idx, 이름, 번호면 이미 등록된 학생이라고 알려주기
    const chkStudent = await this.studentRepository.findOneByCoIdxAndStNameAndStContact(createStudentDto)
    if (chkStudent) {
      throw new CustomException(returnInfos.AlreadyStudent)
    }
    // 학생 등록
    const student = await this.studentRepository.createStudent(createStudentDto)
    return successJson('학생 생성 성공', student.st_idx)
  }

  async list(filter: StudentFilterDto) {
    const { data, pageInfo } = await this.studentRepository.findByFilters(filter)
    // todo - option 확인해서 data에 등록 수업
    return successListJson('학생 목록', data, pageInfo)
  }
}
