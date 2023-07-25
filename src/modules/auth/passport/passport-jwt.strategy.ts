import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface UserPayload {
  id: string;
  admin: boolean;
  valid: string;
}

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log(process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ valid, ...payload }: UserPayload) {
    return {
      ...payload,
      valid,
    };
  }
}
