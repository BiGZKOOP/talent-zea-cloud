import { Request } from 'express';
import { Customer } from '../customer/entities/customer.schema';

interface RequestWithCustomer extends Request {
  user: Customer;
}

export default RequestWithCustomer;
