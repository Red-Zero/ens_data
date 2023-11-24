
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'transfers' })
export class Transfer {
  @PrimaryGeneratedColumn({ comment: '自增主键' })
  id: number;

  @Column({ length: 70, comment: '卖家钱包地址' })
  address_from: string;

  @Column({ length: 70, comment: '买家钱包地址(owner)' })
  address_to: string;


  @Column({ length: 100, comment: 'tokenid', default: '' })
  @Index()
  token_id: string;
 
  @Column({ length: 100, comment: '交易hash', default: '' })
  @Index()
  hash: string;

  @Column({ comment: '区块高度' })
  blocknumber: number;

}