import { Injectable } from '@nestjs/common';
import { CreateDeckBodyDto } from '../dtos/deck/create-deck-body.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeckEntity } from './deck.entity';
import { Repository } from 'typeorm';
import { DeckCardPivotEntity } from '../pivot/deck-card-pivot.entity';
import { CardEntity } from '../card/card.entity';
import { TypeEnum } from '../enums/type.enum';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckEntity)
    private deckRepository: Repository<DeckEntity>,
  ) {}

  public async createDeck(
    reqParams: CreateDeckBodyDto,
  ): Promise<{ id: string; type: TypeEnum; is_shuffled: boolean }> {
    const result = await this.deckRepository
      .createQueryBuilder()
      .insert()
      .into(DeckEntity)
      .values({ ...reqParams, is_shuffled: reqParams.shuffled })
      .returning(['id', 'type', 'is_shuffled'])
      .execute();

    // there will always be raw array, so we need first item from raw
    return result.raw[0];
  }

  public async openDeck(deck_id: string): Promise<object> {
    const result = await this.deckRepository
      .createQueryBuilder('deck')
      .select(
        'deck.id, deck.type, deck.is_shuffled as shuffled, count(card) as remaining, json_agg(card) as cards',
      )
      .leftJoin(DeckCardPivotEntity, 'pivot', 'deck.id = pivot.deck_id')
      .leftJoin(CardEntity, 'card', 'pivot.card_code = card.code')
      .where('deck.id = :deck_id', { deck_id })
      .groupBy('deck.id')
      .execute();

    return result[0];
  }
}
