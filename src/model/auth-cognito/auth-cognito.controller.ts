import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthCognitoService } from './auth-cognito.service';

@Controller('auth')
export class AuthCognitoController {
  constructor(private readonly authCognitoService: AuthCognitoService) {}
  @Post('register')
  async register(@Body() registerRequest: { password: string; email: string }) {
    return await this.authCognitoService.registerUser(registerRequest);
  }

  @Post('login')
  async login(
    @Body() authenticateRequest: { email: string; password: string },
  ) {
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
