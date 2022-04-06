import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthCognitoService } from './auth-cognito.service';

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
      return await this.authCognitoService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
