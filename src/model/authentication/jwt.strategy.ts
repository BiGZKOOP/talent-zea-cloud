import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import TokenPayload from './tokenPayload.interface';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerService: CustomerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    console.log('payload.id', payload._id);
    return this.customerService.getById(payload._id);
  }
}
