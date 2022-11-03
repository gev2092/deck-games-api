import { Module } from '@nestjs/common';
import { PivotService } from './pivot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckCardPivotEntity } from './deck-card-pivot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeckCardPivotEntity])],
  providers: [PivotService],
  exports: [PivotService],
})
export class PivotModule {}
