import { Injectable } from '@nestjs/common';
import AppDataSource from 'src/dbsource';
import { Transfer } from 'src/entity/transfer';

@Injectable()
export class AppService {
  async getOwnerByTokenId(token_id) {
    const data = await AppDataSource.manager.findOne(Transfer, {
      where: {
        token_id,
      },
      order: { blocknumber: 'DESC' }
    })
    return data
  }
}
