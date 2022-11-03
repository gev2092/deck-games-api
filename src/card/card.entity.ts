import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  schema: 'public',
  name: 'card',
})
export class CardEntity {
  @PrimaryColumn()
  code: string;

  @Column()
  value: string;

  @Column()
  suit: string;
}
