import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { DeckCardPivotEntity } from './deck-card-pivot.entity';

@Injectable()
export class PivotService {
  constructor(
    @InjectRepository(DeckCardPivotEntity)
    private deckCardRepository: Repository<DeckCardPivotEntity>,
  ) {}

  public async insertDeckCards(
    deckId: string,
    codes: { code: string }[],
  ): Promise<InsertResult> {
    const data = [];
    codes.forEach((item) => {
      data.push({ deck_id: deckId, card_code: item.code });
    });
    return this.deckCardRepository
      .createQueryBuilder()
      .insert()
      .into(DeckCardPivotEntity)
      .values(data)
      .execute();
  }
}
