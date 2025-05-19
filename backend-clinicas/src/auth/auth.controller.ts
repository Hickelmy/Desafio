import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<any> {
    const { email, password } = dto;

    if (!email || !password) {
      throw new BadRequestException('E-mail e senha são obrigatórios');
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<any> {
    const { name, email, password } = dto;

    if (!name || !email || !password) {
      throw new BadRequestException('Nome, e-mail e senha são obrigatórios');
    }

    return this.authService.register(dto);
  }
}
