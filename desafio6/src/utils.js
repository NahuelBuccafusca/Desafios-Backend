import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

export const createHash= password=> bcrypt.hashSync(password,bcrypt.genSaltSync())
export const isValidPassword=(user,password)=>bcrypt.compareSync(password, user.password)