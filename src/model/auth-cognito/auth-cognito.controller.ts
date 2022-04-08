import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { AuthCognitoService } from './auth-cognito.service';
import RequestWithCustomer from './requestWithCustomer.interface';

@Controller('auth')
export class AuthCognitoController {
  constructor(private readonly authCognitoService: AuthCognitoService) {}
  @Post('register')
  async register(
    @Body() registerRequest: { name: string; password: string; email: string },
  ) {
    return await this.authCognitoService.registerUser(registerRequest);
  }

  @Post('login')
  async login(@Body() authenticateRequest: { name: string; password: string }) {
    try {
      const login = await this.authCognitoService.authenticateUser(
        authenticateRequest,
      );
      if (login) {
        return login;
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
