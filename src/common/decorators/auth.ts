import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards';
import { WebSocketJwt } from './method';

export function Auth(): ReturnType<typeof applyDecorators> {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}

export function WsAuth(): ReturnType<typeof applyDecorators> {
  return applyDecorators(UseGuards(JwtAuthGuard), WebSocketJwt());
}
