import { JwtModuleOptions } from '@nestjs/jwt';

export const options: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
