import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.schema';
import { FileServiceModule } from '../file-service/file-service.module';
import { StripeModule } from '../stripe/stripe.module';
import { AuthCognitoModule } from '../auth-cognito/auth-cognito.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    FileServiceModule,
    StripeModule,
    AuthCognitoModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
