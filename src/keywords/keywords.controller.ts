import {
  Controller,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/request/create-keyword.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Keyword API')
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Post('/')
  createOne(@Body() keyword: CreateKeywordDto) {
    return this.keywordsService.createOne(keyword);
  }

  @Delete('/')
  deleteOne(@Body() keyword: CreateKeywordDto) {
    return this.keywordsService.deleteOne(keyword);
  }
}
