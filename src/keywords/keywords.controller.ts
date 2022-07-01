import {
  Controller,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/request/create-keyword.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KeywordsSwagger } from './keywords.swagger';

@ApiTags(KeywordsSwagger.tag)
@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Post('/')
  @ApiOperation(KeywordsSwagger.createOne.operation)
  @ApiBody(KeywordsSwagger.createOne.body.post)
  @ApiCreatedResponse(KeywordsSwagger.createOne.response[201])
  createOne(@Body() keyword: CreateKeywordDto) {
    return this.keywordsService.createOne(keyword);
  }

  @Delete('/')
  @ApiOperation(KeywordsSwagger.deleteOne.operation)
  @ApiBody(KeywordsSwagger.deleteOne.body.post)
  @ApiResponse(KeywordsSwagger.deleteOne.response[200])
  deleteOne(@Body() keyword: CreateKeywordDto) {
    return this.keywordsService.deleteOne(keyword);
  }
}
