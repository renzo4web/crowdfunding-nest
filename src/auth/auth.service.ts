import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === password) {
      const { password, email, ...rest } = user;
      return rest; // {id,name}
    }

    return null;
  }

  async login(user: User) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
