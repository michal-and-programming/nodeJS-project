import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 40)
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  client: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  address: string;
}
