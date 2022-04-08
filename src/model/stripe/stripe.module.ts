import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';
import ChargeController from './charge.controller';

@Module({
  imports: [ConfigModule],
  controllers: [StripeController, ChargeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
