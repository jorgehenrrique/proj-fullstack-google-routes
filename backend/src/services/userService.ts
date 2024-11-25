import { getUserById } from '../models/User.js';
import { User } from '../types/types.js';

export class UserService {
  static async validateUser(customer_id: string): Promise<User | null> {
    return await getUserById(customer_id);
  }
}
