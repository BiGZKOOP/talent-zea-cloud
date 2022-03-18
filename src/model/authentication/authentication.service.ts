import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerService } from '../customer/customer.service';
import { RegisterDto } from './dto/register.dto';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //For Cognito Thing

  // public async register(registrationData: RegisterDto) {
  //   const hashedPassword = await bcrypt.hash(registrationData.password, 10);
  //   try {
  //     const createdUser = await this.customerService.register({
  //       ...registrationData,
  //       password: hashedPassword,
  //     });
  //     createdUser.password = undefined;
  //     return createdUser;
  //   } catch (error) {
  //     if (error?.code === 11000) {
  //       throw new HttpException(
  //         'User with that email already exists',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     throw new HttpException(
  //       'Something went wrong',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  //For Cognito Thing

  // public async getAuthenticatedUser(email: string, plainTextPassword: string) {
  //   try {
  //     const customer = await this.customerService.getByEmail(email);
  //     await AuthenticationService.verifyPassword(
  //       plainTextPassword,
  //       customer.password,
  //     );
  //     customer.password = undefined;
  //     return customer;
  //   } catch (error) {
  //     // console.log(error);
  //     throw new HttpException(
  //       'Wrong credentials provided',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  public getCookieWithJwtAccessToken(_id: string) {
    const payload: TokenPayload = { _id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(_id: string) {
    const payload: TokenPayload = { _id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      // expiresIn: '1d',
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    console.log('token', token);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }
  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
