import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Customer } from '../customer/entities/customer.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }
  //For Cognito Thing
  // async validate(email: string, password: string): Promise<Customer> {
  //   return this.authenticationService.getAuthenticatedUser(email, password);
  // }
}
