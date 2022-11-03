import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';

@Module({
  providers: [CardService],
  imports: [TypeOrmModule.forFeature([CardEntity])],
  exports: [CardService],
})
export class CardModule {}
