import { Controller, Post, Body, Headers, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto.email, authDto.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive secure JWT' })
  @ApiResponse({
    status: 200,
    description: 'JWT returned with JTI and Fingerprint',
  })
  async login(
    @Body() authDto: AuthDto,
    @Headers('user-agent') userAgent: string,
    @Ip() ip: string,
  ) {
    // Logic Improvement: Combining IP and User-Agent for a stronger fingerprint
    const fingerprintSource = `${userAgent}|${ip}`;
    return this.authService.login(
      authDto.email,
      authDto.password,
      fingerprintSource,
    );
  }
}
