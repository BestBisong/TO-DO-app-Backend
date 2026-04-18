import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, pass: string) {
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(pass, 12);
    const user = this.userRepo.create({ email, password: hashedPassword });
    return this.userRepo.save(user);
  }

  async login(email: string, pass: string, fingerprintSource: string) {
    // 1. Validate User Credentials
    const user = await this.userRepo.findOne({
      where: { email },
      select: ['id', 'password', 'email'],
    });

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Create Secure Payload
    const payload = {
      sub: user.id,
      email: user.email,
      jti: uuidv4(), // Unique ID to prevent replay attacks
      fgp: bcrypt.hashSync(fingerprintSource, 10), // Hashed device/IP fingerprint
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
