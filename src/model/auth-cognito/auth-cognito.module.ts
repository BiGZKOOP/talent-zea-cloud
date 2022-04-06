import { Module } from '@nestjs/common';
import { AuthCognitoService } from './auth-cognito.service';
import { AuthCognitoController } from './auth-cognito.controller';
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule],
  controllers: [AuthCognitoController],
  providers: [AuthCognitoService,JwtStrategy],
  exports: [AuthCognitoModule]
})
export class AuthCognitoModule {}
