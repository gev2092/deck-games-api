import { Module } from '@nestjs/common';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from './deck.entity';
import { CardModule } from '../card/card.module';
import { PivotModule } from '../pivot/pivot.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeckEntity]), CardModule, PivotModule],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
