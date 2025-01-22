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
