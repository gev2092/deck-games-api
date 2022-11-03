import { Injectable } from '@nestjs/common';
import { CreateDeckBodyDto } from '../dtos/deck/create-deck-body.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeckEntity } from './deck.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(DeckEntity)
    private deckRepository: Repository<DeckEntity>,
  ) {}

  public async createDeck(reqParams: CreateDeckBodyDto) {
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

  public async openDeck(deckId: string) {
    const result = await this.deckRepository
      .createQueryBuilder('deck')
      .leftJoinAndSelect('deck_id', 'card')
      .where('deck_id = :deckId', { deckId: deckId })
      .getQueryAndParameters();
    console.log(result);
  }
}
