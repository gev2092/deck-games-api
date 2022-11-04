import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  schema: 'public',
  name: 'deck-card-pivot',
})
export class DeckCardPivotEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('uuid')
  deck_id: string; // should be foreign key

  @Column()
  card_code: string; // should be foreign key
}
