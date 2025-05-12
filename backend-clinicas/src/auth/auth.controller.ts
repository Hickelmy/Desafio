import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

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
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const { name, email, password } = registerDto;

    if (!name || !email || !password) {
      throw new BadRequestException('Nome, e-mail e senha são obrigatórios');
    }

    return this.authService.register(registerDto);
  }
}
