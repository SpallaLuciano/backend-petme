import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtEnvs } from '../../../common';

interface UserPayload {
  id: string;
  admin: boolean;
  valid: string;
}

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.debug(JSON.stringify(jwtEnvs), jwtEnvs.secret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtEnvs.secret,
    });
  }

  async validate({ valid, ...payload }: UserPayload) {
    return {
      ...payload,
      valid,
    };
  }
}
