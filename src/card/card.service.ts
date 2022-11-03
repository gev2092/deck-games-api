import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from './card.entity';
import { TypeEnum } from '../enums/type.enum';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private cardRepository: Repository<CardEntity>,
  ) {}

  public async getCards(type: TypeEnum, shuffled: boolean) {
    const query = this.cardRepository.createQueryBuilder().select('code');

    if (type === TypeEnum.Short) {
      query.where("value not in ('2','3','4','5','6')");
    }
    if (shuffled) {
      query.orderBy('random()');
    }
    return query.execute();
  }
}
