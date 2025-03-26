import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

export async function saltAndHashPassword(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }