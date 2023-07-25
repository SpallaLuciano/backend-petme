import { JwtModuleOptions } from '@nestjs/jwt';
import { jwtEnvs } from '../../../common';

const { secret, expiresIn } = jwtEnvs();

export const options: JwtModuleOptions = {
  secret: secret,
  signOptions: {
    expiresIn,
  },
};
