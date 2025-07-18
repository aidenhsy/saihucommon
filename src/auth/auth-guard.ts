import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators';
import { BaseError, BaseResponseDto } from '../dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject('JWT_SECRET') private readonly jwtSecret: string,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new BaseError(BaseResponseDto.CODE_NOT_FOUND, '令牌缺失');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      (request as any).user = payload;
    } catch {
      throw new BaseError(BaseResponseDto.CODE_UNAUTHORIZED, '令牌无效');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
