import { Module } from '@nestjs/common';
import { DeckModule } from './deck/deck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from './deck/deck.entity';
import { CardEntity } from './card/card.entity';
import { DeckCardPivotEntity } from './pivot/deck-card-pivot.entity';
import { CardModule } from './card/card.module';
import { PivotModule } from './pivot/pivot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // this all could be in config file instead of hardcoded values
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [DeckEntity, CardEntity, DeckCardPivotEntity],
      synchronize: true, // I have read this is not good for prod but no time to create migrations :)
    }),
    DeckModule,
    CardModule,
    PivotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
