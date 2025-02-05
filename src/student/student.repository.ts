import { Student } from './student.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateStudentDto, HaveClassesStudentFilterDto, StudentFilterDto } from './student.dto'
import { getListData } from 'src/common/common.service'
import { CustomException } from 'src/common/exception/ExceptionFilter'
import { returnInfos } from 'src/common/exception/ErrorMessages'
import { Area } from 'src/entity/area.entity'
import { ClassesEnrollment } from 'src/classes/classesEnrollment.entity'

export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>, // Repository를 직접 주입받음
  ) {}

  async createStudent(studentData: CreateStudentDto): Promise<Student> {
    const student = this.repository.create(studentData)
    return this.repository.save(student)
  }

  async findOneByCompanyIdxAndStudentIdx(companyIdx: number, studentIdx: number) {
    return this.repository.findOne({
      where: {
        company_idx: companyIdx,
        st_idx: studentIdx,
      },
    })
  }

  async findOneByCoIdxAndStNameAndStContact(studentData: CreateStudentDto): Promise<Student | null> {
    return this.repository.findOne({
      where: {
        company_idx: studentData.company_idx,
        st_name: studentData.st_name,
        st_contact: studentData.st_contact,
      },
    })
  }

  async findByFilters(filter: StudentFilterDto) {
    const query = this.repository
      .createQueryBuilder('st')
      .innerJoin(Area, 'ar', 'st.area_idx = ar.ar_idx')
      .select([
        'st.st_idx as st_idx',
        'st.company_idx as company_idx',
        'st.area_idx as area_idx',
        'st.st_name as st_name',
        'st.st_contact as st_contact',
        'st.st_address as st_address',
        'st.st_address_x as st_address_x',
        'st.st_address_y as st_address_y',
        'st.created_at as created_at',
        'st.updated_at as updated_at',
        'ar.ar_name as ar_name',
      ])
    // where 문
    if (filter.company_idx) {
      query.andWhere('st.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.area_idx) {
      query.andWhere('st.area_idx = :area_idx', { area_idx: filter.area_idx })
    }
    if (filter.st_idx) {
      query.andWhere('st.st_idx = :st_idx', { st_idx: filter.st_idx })
    }
    if (filter.ar_name) {
      query.andWhere('ar.ar_name LIKE :ar_name', { ar_name: `%${filter.ar_name}%` })
    }
    if (filter.st_name) {
      query.andWhere('st.st_name LIKE :st_name', { st_name: `%${filter.st_name}%` })
    }
    if (filter.st_contact) {
      query.andWhere('st.st_contact LIKE :st_contact', { st_contact: `%${filter.st_contact}%` })
    }
    if (filter.st_address) {
      query.andWhere('st.st_address LIKE :st_address', { st_address: `%${filter.st_address}%` })
    }
    // order 문
    if (filter.order == 'created_at') {
      query.orderBy('st.created_at', filter.dir)
    } else if (filter.order == 'company_idx') {
      query.orderBy('st.company_idx', filter.dir)
    } else if (filter.order == 'st_name') {
      query.orderBy('st.st_name', filter.dir)
    } else {
      throw new CustomException(returnInfos.BadRequest, '등록되지 않은 order -> 추가 문의해주세요!')
    }
    // listData
    return await getListData(query, filter)
  }

  async findHaveClassesStudentByFilters(filter: HaveClassesStudentFilterDto) {
    const query = this.repository
      .createQueryBuilder('st')
      .innerJoin(ClassesEnrollment, 'ce', 'st.st_idx = ce.student_idx')
      .select([
        'st.st_idx as st_idx',
        'st.company_idx as company_idx',
        'st.area_idx as area_idx',
        'st.st_name as st_name',
        'st.st_contact as st_contact',
        'st.st_address as st_address',
        'st.st_address_x as st_address_x',
        'st.st_address_y as st_address_y',
        'st.created_at as created_at',
        'st.updated_at as updated_at',
      ])
    // where 문
    if (filter.company_idx) {
      query.andWhere('st.company_idx = :company_idx', { company_idx: filter.company_idx })
    }
    if (filter.ce_date) {
      query.andWhere('ce.ce_date = :ce_date', { ce_date: filter.ce_date })
    }
    if (filter.st_name) {
      query.andWhere('st.st_name LIKE :st_name', { st_name: `%${filter.st_name}%` })
    }

    // order 문
    if (filter.order == 'created_at') {
      query.orderBy('st.created_at', filter.dir)
    } else if (filter.order == 'company_idx') {
      query.orderBy('st.company_idx', filter.dir)
    } else if (filter.order == 'st_name') {
      query.orderBy('st.st_name', filter.dir)
    } else {
      throw new CustomException(returnInfos.BadRequest, '등록되지 않은 order -> 추가 문의해주세요!')
    }
    query.groupBy('st.st_idx')
    // listData
    return await getListData(query, filter)
  }
}
