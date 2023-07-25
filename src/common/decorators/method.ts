import { UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { verify, JwtPayload } from 'jsonwebtoken';
import { jwtEnvs } from '../enviroment';

export function WebSocketJwt(): MethodDecorator {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const client: Socket = args[0];
      const token = client.handshake.auth.token;

      if (!token) {
        throw new UnauthorizedException();
      }

      const decoded = verify(token, jwtEnvs().secret) as JwtPayload;

      client.handshake['user'] = { ...client.handshake['user'], ...decoded };
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
