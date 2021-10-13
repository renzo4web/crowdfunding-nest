import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'renzo', email: 'renzo@gmail.com', password: '1234567' },
    { id: 2, name: 'mark', email: 'mark@gmail.com', password: '12345678' },
    { id: 3, name: 'jack', email: 'jack@gmail.com', password: '314124' },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
