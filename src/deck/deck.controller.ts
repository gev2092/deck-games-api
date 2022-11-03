import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateDeckBodyDto } from '../dtos/deck/create-deck-body.dto';
import { DeckService } from './deck.service';
import { CardService } from '../card/card.service';
import { PivotService } from '../pivot/pivot.service';
import { OpenDeckDto } from "../dtos/deck/open-deck.dto";

@Controller('deck')
export class DeckController {
  constructor(
    private readonly deckService: DeckService,
    private readonly cardService: CardService,
    private readonly pivotService: PivotService,
  ) {}

  @Post('create')
  async createDeck(@Body() body: CreateDeckBodyDto) {
    const deck = await this.deckService.createDeck(body);
    const cardCodes = await this.cardService.getCards(body.type, body.shuffled);

    await this.pivotService.insertDeckCards(deck.id, cardCodes);

    return deck;
  }

  @Get('open/:deckId')
  openDeck(@Param() param: OpenDeckDto) {
    return this.deckService.openDeck(param.deckId);
  }
}
