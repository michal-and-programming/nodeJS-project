import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class UpdateOrderDTO {
  @IsOptional()
  @IsString()
  @IsUUID()
  @Length(10, 40)
  productId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Length(10, 40)
  clientId?: string;
}
