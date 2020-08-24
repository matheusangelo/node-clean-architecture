import { Encripter } from '../../data/protocols/encripter'
import bcript from 'bcrypt'

export class BcriptAdapter implements Encripter {
  async encript (value: string): Promise<string> {
    return await bcript.hash(value, 12)
  }
}
