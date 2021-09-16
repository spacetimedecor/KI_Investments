import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import EncodeUrlDto from './interfaces/EncodeUrlDto';
import DecodeUrlDto from './interfaces/DecodeUrlDto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('Initialises state', () => {
      expect(appService.getUrls()).toStrictEqual([]);
    });

    it('Encodes a url', () => {
      const longUrl = 'test';
      const encodeUrlDto: EncodeUrlDto = { url: longUrl };

      appController.encode(encodeUrlDto);
      expect(appService.getUrls()).toStrictEqual(
        expect.arrayContaining([expect.objectContaining({ longUrl })]),
      );
    });

    it('Decodes a url', () => {
      const longUrl = 'test';
      const encodeUrlDto: EncodeUrlDto = { url: longUrl };
      const shortUrl = appController.encode(encodeUrlDto);
      const DecodeUrlDto: DecodeUrlDto = { url: shortUrl };
      const decodedUrl = appController.decode(DecodeUrlDto);
      expect(decodedUrl).toBe(longUrl);
    });

    it('Redirects valid short to long url', () => {
      const longUrl = 'test';
      const encodeUrlDto: EncodeUrlDto = { url: longUrl };
      const shortUrl = appController.encode(encodeUrlDto);
      const validUrl = appController.redirectToLongUrl(shortUrl);
      expect(validUrl).toStrictEqual({ url: longUrl });
      expect(() => {
        appController.redirectToLongUrl('invalidUrl');
      }).toThrowError();
    });
  });
});
