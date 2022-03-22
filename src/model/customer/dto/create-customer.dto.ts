import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  // @IsString()
  // @IsNotEmpty()
  // name: string;
  // @IsString()
  // @IsNotEmpty()
  // address: string;
  // @IsString()
  // @IsNotEmpty()
  // nicNumber: string;
  // @IsString()
  // @IsNotEmpty()
  // password: string;
  // @IsString()
  // @IsNotEmpty()
  // email: string;
  // @IsString()
  // @IsNotEmpty()
  // countryCode: string;
  // @IsString()
  // @IsNotEmpty()
  // phoneNumber: string;
  // @IsString()
  // @IsNotEmpty()
  // dob: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  nicNumber: string;
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(6)
  // password: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  countryCode: string;
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  dob: string;
}
