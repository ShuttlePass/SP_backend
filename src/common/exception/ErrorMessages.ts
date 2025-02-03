export type returnJson = {
  message: string
  code: number
  data?: any
}

export type returnInfo = {
  json: returnJson
  statusCode: number
}

export const returnInfos: { [key: string]: returnInfo } = {
  WrongId: {
    json: {
      message: '잘못된 아이디',
      code: -100,
    },
    statusCode: 400,
  },
  WrongPassword: {
    json: {
      message: '잘못된 비밀번호',
      code: -101,
    },
    statusCode: 400,
  },
  AlreadyUsedId: {
    json: {
      message: '이미 사용중인 아이디',
      code: -102,
    },
    statusCode: 409,
  },
  AlreadyStudent: {
    json: {
      message: '이미 등록된 학생입니다',
      code: -103,
    },
    statusCode: 409,
  },
  ConflictClassesTime: {
    json: {
      message: '이미 등록된 수업과 시간이 겹칩니다',
      code: -104,
    },
    statusCode: 409,
  },
  AlreadyHaveShuttle: {
    json: {
      message: '이미 배정된 셔틀이 있는 기사님 입니다.',
      code: -105,
    },
    statusCode: 409,
  },
  AlreadyReservation: {
    json: {
      message: '이미 배정했습니다.',
      code: -105,
    },
    statusCode: 409,
  },
  NoClasses: {
    json: {
      message: '해당 날짜에 등록된 수업이 없습니다',
      code: -106,
    },
    statusCode: 409,
  },
  BackEnd: {
    json: {
      message: '서버에러',
      code: -1,
    },
    statusCode: 500,
  },
  BadRequest: {
    json: {
      message: '입력이 유효하지 않습니다.',
      code: -2,
    },
    statusCode: 400,
  },
  JwtAuth: {
    json: {
      message: 'jwt가 없거나 유효하지 않습니다.',
      code: -3,
    },
    statusCode: 401,
  },
}
