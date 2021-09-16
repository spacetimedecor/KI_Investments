import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import EncodeUrlDto from './interfaces/EncodeUrlDto';
import DecodeUrlDto from './interfaces/DecodeUrlDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUrls(): string {
    return JSON.stringify(this.appService.getUrls());
  }

  @Post('/encode')
  encode(@Body() encodeUrlDto: EncodeUrlDto): string {
    return this.appService.encode(encodeUrlDto);
  }

  @Post('/decode')
  decode(@Body() decodeUrlDto: DecodeUrlDto): string {
    return this.appService.decode(decodeUrlDto);
  }

  @Get(':shortUrl')
  @Redirect()
  redirectToLongUrl(@Param('shortUrl') shortUrl: string) {
    const longUrl: string | null = this.appService.decode({ url: shortUrl });
    if (longUrl) return { url: longUrl };
    throw new BadRequestException('Url not found');
  }
}
