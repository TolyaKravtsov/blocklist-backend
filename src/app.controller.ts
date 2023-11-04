import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { DbService } from './db/db.service';

class helloWorldDto {
  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: DbService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: helloWorldDto,
  })
  async getHello(): Promise<helloWorldDto> {
    const users = await this.dbService.user.findFirst({});
    console.log(users);
    return { message: this.appService.getHello() };
  }
}
