import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CustomerService } from '../customer/customer.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithCustomer from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import JwtRefreshGuard from './jwt-authentication.guard';
import { Response } from 'express';
import * as Joi from '@hapi/joi';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly customerService: CustomerService,
  ) {}

  //For Cognito Thing
  // @Post('register')
  // async register(
  //   @Body() registrationData: RegisterDto,
  //   @Res() response: Response,
  // ) {
  //   const schema = Joi.object({
  //     name: Joi.string().required(),
  //     address: Joi.string().required(),
  //     nicNumber: Joi.string().required(),
  //     password: Joi.string().required(),
  //     email: Joi.string().required(),
  //     countryCode: Joi.string().required(),
  //     phoneNumber: Joi.string().required(),
  //     dob: Joi.string().required(),
  //   });
  //   const validation = schema.validate(registrationData);
  //   if (validation.error) {
  //     response.status(401).send(validation.error);
  //   } else {
  //     const customerModel: RegisterDto = validation.value;
  //     try {
  //       const register = await this.authenticationService.register(
  //         customerModel,
  //       );
  //       if (register) {
  //         response.status(201).send({
  //           statusCode: HttpStatus.OK,
  //           message: 'Customer Registered successfully',
  //           register,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       response.status(401).send(error);
  //     }
  //   }
  // }

  // @HttpCode(200)
  // @UseGuards(LocalAuthenticationGuard)
  // @Post('log-in')
  // async logIn(@Req() request: RequestWithCustomer) {
  //   console.log(request);
  //   const { user } = request;
  //   const accessTokenCookie =
  //     this.authenticationService.getCookieWithJwtAccessToken(user._id);
  //   const { cookie: refreshTokenCookie, token: refreshToken } =
  //     this.authenticationService.getCookieWithJwtRefreshToken(user._id);
  //
  //   console.log(accessTokenCookie);
  //
  //   await this.customerService.setCurrentRefreshToken(refreshToken, user._id);
  //
  //   request.res.setHeader('Set-Cookie', [
  //     accessTokenCookie,
  //     refreshTokenCookie,
  //   ]);
  //   return user;
  // }
  //
  // @UseGuards(JwtAuthenticationGuard)
  // @Post('log-out')
  // async logOut(@Req() request: RequestWithCustomer) {
  //   await this.customerService.removeRefreshToken(request.user._id);
  //   request.res.setHeader(
  //     'Set-Cookie',
  //     this.authenticationService.getCookiesForLogOut(),
  //   );
  // }

  //For Cognito Thing
  // @UseGuards(JwtAuthenticationGuard)
  // @Get()
  // authenticate(@Req() request: RequestWithCustomer) {
  //   const customer = request.user;
  //   customer.password = undefined;
  //   return customer;
  // }

  // @UseGuards(JwtRefreshGuard)
  // @Get('refresh')
  // refresh(@Req() request: RequestWithCustomer) {
  //   const accessTokenCookie =
  //     this.authenticationService.getCookieWithJwtAccessToken(request.user._id);
  //
  //   request.res.setHeader('Set-Cookie', accessTokenCookie);
  //   return request.user;
  // }
}
