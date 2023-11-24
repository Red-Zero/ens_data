import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getOwnerByTokenId')
  async getOwnerByTokenId(@Query() query) {
    console.log(1111)
    return await this.appService.getOwnerByTokenId(query.token_id);
  }
}
