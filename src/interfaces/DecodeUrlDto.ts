import { IsUrl } from 'class-validator';

export default class DecodeUrlDto {
  @IsUrl()
  url: string;
}
