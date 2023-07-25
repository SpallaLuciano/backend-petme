import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtEnvs } from '../../../common';

const { secret } = jwtEnvs();

interface UserPayload {
  id: string;
  admin: boolean;
  valid: string;
}

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log(secret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate({ valid, ...payload }: UserPayload) {
    return {
      ...payload,
      valid,
    };
  }
}
