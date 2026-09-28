import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @MinLength(2)
  customerName!: string;

  @IsEmail()
  customerEmail!: string;
}
