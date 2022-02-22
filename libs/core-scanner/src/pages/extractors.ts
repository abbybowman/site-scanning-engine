import { HTTPRequest, Page } from 'puppeteer';

export const createOutboundRequestsExtractor = (page: Page) => {
  const outboundRequests: HTTPRequest[] = [];
  page.on('request', (request) => {
    outboundRequests.push(request);
  });
  return () => {
    return outboundRequests;
  };
};

export const createCSSRequestsExtractor = (page: Page) => {
  const cssPages = [];
  page.on('response', async (response) => {
    if (response.ok() && response.request().resourceType() == 'stylesheet') {
      const cssPage = await response.text();
      cssPages.push(cssPage);
    }
  });
  return () => {
    return cssPages;
  };
};
