import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Length(10, 40)
  productId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Length(10, 40)
  clientId: string;
}
