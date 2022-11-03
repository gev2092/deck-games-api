import { ApiProperty } from '@nestjs/swagger';
import { TypeEnum } from '../../enums/type.enum';
import { IsBoolean, IsEnum } from 'class-validator';

export class CreateDeckBodyDto {
  @ApiProperty({
    example: 'FULL',
  })
  @IsEnum(TypeEnum)
  type: TypeEnum;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  shuffled: boolean;
}
