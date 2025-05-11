import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from '../users/user.entity';
import { RegisterDto } from 'src/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async register(data: RegisterDto): Promise<User> {
    const exists = await this.usersRepository.findOne({ where: { email: data.email } });
    if (exists) {
      throw new ConflictException('Usuário já registrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = this.usersRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
    });

    return this.usersRepository.save(newUser);
  }
}
