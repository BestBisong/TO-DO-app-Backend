import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
  sub: string;
  email: string;
  jti: string;
  fgp: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const userAgent = request.headers['user-agent'] || 'unknown';
      const ip = request.ip || 'unknown';
      const currentFingerprint = `${userAgent}|${ip}`;

      const isDeviceValid = await bcrypt.compare(
        currentFingerprint,
        payload.fgp,
      );

      if (!isDeviceValid) {
        throw new UnauthorizedException('Security Alert: Device mismatch');
      }

      request['user'] = {
        id: payload.sub,
        email: payload.email,
        jti: payload.jti,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
