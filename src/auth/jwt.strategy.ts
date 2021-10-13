import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', // TODO put secret on .env
    });
  }

  async validate(payload: any) {
    // ej: const user = await this.userService.getById(payload.sub)
    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
