import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

class helloWorldDto {
  @ApiProperty()
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    type: helloWorldDto,
  })
  getHello(): helloWorldDto {
    return { message: this.appService.getHello() };
  }
}
