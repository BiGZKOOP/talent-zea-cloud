import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { CustomerModule } from './model/customer/customer.module';
import { DatabaseModule } from './db/database.module';
import { FileServiceModule } from './model/file-service/file-service.module';
import { MainServiceModule } from './model/main-service/main-service.module';
import { SubServiceModule } from './model/sub-service/sub-service.module';
import { AuthCognitoModule } from './model/auth-cognito/auth-cognito.module';
import { StripeModule } from './model/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        PORT: Joi.number(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        COGNITO_USER_POOL_ID: Joi.string().required(),
        COGNITO_CLIENT_ID: Joi.string().required(),
        COGNITO_REGION: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
        FRONTEND_URL_ADMIN: Joi.string(),
      }),
    }),
    DatabaseModule,
    CustomerModule,
    FileServiceModule,
    MainServiceModule,
    SubServiceModule,
    AuthCognitoModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
