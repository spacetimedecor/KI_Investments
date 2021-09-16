import { Injectable } from '@nestjs/common';
import URLSchema from './interfaces/URLSchema';
import EncodeUrlDto from './interfaces/EncodeUrlDto';
import DecodeUrlDto from './interfaces/DecodeUrlDto';
import { nanoid } from 'nanoid';

@Injectable()
export class AppService {
  private static readonly Urls: URLSchema[] = [];

  getUrls(): URLSchema[] {
    return AppService.Urls;
  }

  encode(encodeUrlDto: EncodeUrlDto): string {
    const { url: longUrl } = encodeUrlDto;

    // Find if already encoded
    const previouslyEncodedUrl: URLSchema | null =
      AppService.Urls.find((url: URLSchema) => url.longUrl === longUrl) ?? null;

    if (!!previouslyEncodedUrl) return previouslyEncodedUrl.shortUrl;

    // Otherwise, encode and return encoded url
    const encodedUrl = nanoid(10);
    AppService.Urls.push({ longUrl, shortUrl: encodedUrl });
    return encodedUrl;
  }

  decode(decodeUrlDto: DecodeUrlDto): string | null {
    const { url: shortUrl } = decodeUrlDto;

    // Find if already encoded
    const previouslyEncodedUrl: URLSchema | null =
      AppService.Urls.find((url: URLSchema) => url.shortUrl === shortUrl) ??
      null;

    if (previouslyEncodedUrl) return previouslyEncodedUrl.longUrl;

    return null;
  }
}
