import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Keyword extends BaseEntity {
  @PrimaryColumn({ primary: false })
  user: string;

  @PrimaryColumn({ primary: false })
  keyword: string;
}
