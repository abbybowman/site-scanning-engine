import { Browser } from 'puppeteer';
import { newTestPage } from '../test-helper';
import { buildCoreResult } from './core';

describe('core scan', () => {
  it('works', async () => {
    await newTestPage(async ({ page, response, sourceUrl }) => {
      expect(
        buildCoreResult(
          { websiteId: 123, scanId: 'asdf', url: 'https://www.18f.gov' },
          page,
          response,
        ),
      ).toEqual({
        finalUrl: sourceUrl,
        finalUrlBaseDomain: '',
        finalUrlIsLive: true,
        finalUrlMIMEType: 'multipart/related',
        finalUrlSameDomain: false,
        finalUrlSameWebsite: false,
        finalUrlStatusCode: 200,
        status: 'completed',
        targetUrlBaseDomain: '18f.gov',
        targetUrlRedirects: false,
        website: {
          id: 123,
        },
      });
    });
  });
});
