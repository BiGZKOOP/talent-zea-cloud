import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import CreateChargeDto from './dto/createCharge.dto';
import RequestWithCustomer from '../auth-cognito/requestWithCustomer.interface';
import { Response } from 'express';

@Controller('charge')
export default class ChargeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async createCharge(
    @Body() charge: CreateChargeDto,
    @Req() request: RequestWithCustomer,
    @Res() response: Response,
  ) {
    try {
      const charges = await this.stripeService.charge(
        charge.amount,
        charge.paymentMethodId,
        charge.stripeCustomerId,
      );
      if (charges) {
        response.status(201).send({
          statusCode: HttpStatus.OK,
          message: 'Payment successful',
          isPaid: charges.charges.data[0].paid,
          data: charges.charges.data[0].payment_method_details,
        });
      }
    } catch (error) {
      console.log(error);
      response.status(401).send(error);
    }
  }
}
