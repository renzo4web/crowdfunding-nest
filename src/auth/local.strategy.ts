import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    }); // config
  }

  // strategys always required a validate method
  async validate(email: string, password: string): Promise<any> {
    console.log('local strategys', { email, password });
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
