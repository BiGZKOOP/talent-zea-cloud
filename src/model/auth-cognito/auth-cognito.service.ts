import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthCognitoService {
  private readonly userPool: CognitoUserPool;
  constructor(private readonly configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: configService.get('COGNITO_USER_POOL_ID'),
      ClientId: configService.get('COGNITO_CLIENT_ID'),
    });
  }
  registerUser(registerRequest: { email: string; password: string }) {
    const { email, password } = registerRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        email,
        password,

        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  authenticateUser(user: { email: string; password: string }) {
    const { email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
