import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string;
}
