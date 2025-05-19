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
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async login(user: User): Promise<{
    access_token: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
    };
  }> {
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    const { id, name, email, avatar } = user;

    return {
      access_token,
      user: {
        id,
        name,
        email,
        avatar
      }
    };
  }

  async register(data: RegisterDto & { avatar?: string }): Promise<User> {
    const { name, email, password, avatar } = data;

    const exists = await this.usersRepository.findOne({ where: { email } });
    if (exists) {
      throw new ConflictException('Usuário já registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar
    });

    return this.usersRepository.save(newUser);
  }
}
