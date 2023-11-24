
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'task_config' })
export class TaskConfig {
  @PrimaryGeneratedColumn({ comment: '自增主键' })
  id: number;

  @Column({ length: 20, comment: '任务名称' })
  task_name: string;

  @Column({  comment: '与最新区块误差' })
  deviation: number;

  @Column({  comment: '每次获取区块数量' })
  block_nums: number;

  @Column({  comment: '当前数据区块高度'})
  block_number: number;

}