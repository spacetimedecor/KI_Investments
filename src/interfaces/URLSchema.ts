import { IsUrl } from 'class-validator';

export default class URLSchema {
  @IsUrl()
  longUrl: string;

  shortUrl: string;
}
