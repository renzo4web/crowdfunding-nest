import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  //projects: {
  //id: 3,
  //code: 'BBV',
  //goal: 500,
  //curr_amount: 100,
  //name: 'cocacola',
  //owner: null,
  //status: 'completed',
  //},

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...createUserDto,
    });

    return this.usersRepository.save(user);
  }
}
