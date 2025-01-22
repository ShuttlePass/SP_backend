import * as bcrypt from 'bcrypt'

// 비밀번호를 해싱하는 함수
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10 // salt의 강도 (보통 10 정도 사용)
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
  return isMatch
}
