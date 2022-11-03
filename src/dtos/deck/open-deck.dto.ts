import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class OpenDeckDto {
  @ApiProperty({
    example: '',
  })
  @IsUUID()
  deckId: string;
}
