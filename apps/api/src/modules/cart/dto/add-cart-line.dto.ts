import { IsInt, IsString, Max, Min } from 'class-validator';

export class AddCartLineDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity!: number;
}
