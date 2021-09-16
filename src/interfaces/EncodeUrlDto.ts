import { IsUrl } from 'class-validator';

export default class EncodeUrlDto {
  @IsUrl()
  url: string;
}
