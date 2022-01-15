import { mock, MockProxy } from 'jest-mock-extended';
import { Browser, Page } from 'puppeteer';
import { Test, TestingModule } from '@nestjs/testing';

import { CoreInputDto } from '@app/core-scanner/core.input.dto';

import { BrowserService } from './browser.service';
import { PUPPETEER_TOKEN } from './puppeteer.service';

describe('BrowserService', () => {
  let service: BrowserService;
  let mockBrowser: MockProxy<Browser>;
  let mockPage: MockProxy<Page>;
  const finalUrl = 'https://18f.gsa.gov';

  beforeEach(async () => {
    mockBrowser = mock<Browser>();
    mockPage = mock<Page>();

    mockPage.url.calledWith().mockReturnValue(finalUrl);
    mockBrowser.newPage.calledWith().mockResolvedValue(mockPage);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrowserService,
        {
          provide: PUPPETEER_TOKEN,
          useValue: mockBrowser,
        },
      ],
    }).compile();

    service = module.get<BrowserService>(BrowserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should close the page after scanning', async () => {
    mockBrowser.newPage.calledWith().mockResolvedValue(mockPage);
    await service.processPage(async (page) => {});
    expect(mockPage.close).toHaveBeenCalled();
  });

  it('closes the browser onModuleDestroy lifecycle event', async () => {
    await service.onModuleDestroy();
    expect(mockBrowser.close).toHaveBeenCalled();
  });
});
