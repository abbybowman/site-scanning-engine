import { Logger } from 'pino';
import { Page } from 'puppeteer';

import { CoreInputDto } from '@app/core-scanner/core.input.dto';
import { buildUrlScanResult } from '@app/core-scanner/scans/url-scan';
import { PrimaryScans } from 'entities/scan-page.entity';

import { buildDapResult } from '../scans/dap';
import { buildSeoResult } from '../scans/seo';
import { buildThirdPartyResult } from '../scans/third-party';
import { createUswdsScanner } from '../scans/uswds';
import { buildLoginResult } from '../scans/login';
import { promiseAll, getHttpsUrl } from '../util';
import { buildCmsResult } from '../scans/cms';
import {
  createCSSRequestsExtractor,
  createOutboundRequestsExtractor,
} from './extractors';
import { buildRequiredLinksResult } from '../scans/required-links';
import { buildCookieResult } from '../scans/cookies';
import { buildSearchResult } from '../scans/search';
import { buildMobileResult } from '../scans/mobile';

export const createPrimaryScanner = (logger: Logger, input: CoreInputDto) => {
  return async (page) => {
    return await primaryScan(logger, input, page);
  };
};

const primaryScan = async (
  logger: Logger,
  input: CoreInputDto,
  page: Page,
): Promise<PrimaryScans> => {
  const url = getHttpsUrl(input.url);

  logger.info('Processing main page...');

  const getCSSRequests = await createCSSRequestsExtractor(page, logger);
  const getOutboundRequests = createOutboundRequestsExtractor(page);

  const response = await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  const [
    dapScan,
    thirdPartyScan,
    cookieScan,
    seoScan,
    uswdsScan,
    loginScan,
    cmsScan,
    requiredLinksScan,
    searchScan,
    mobileScan,
  ] = await promiseAll([
    buildDapResult(logger, getOutboundRequests()),
    buildThirdPartyResult(response, getOutboundRequests()),
    buildCookieResult(page),
    buildSeoResult(logger, page, response),
    createUswdsScanner({ logger, getCSSRequests }, page)(response),
    buildLoginResult(response),
    buildCmsResult(response),
    buildRequiredLinksResult(page),
    buildSearchResult(page),
    buildMobileResult(logger, page),
  ]);
  const urlScan = buildUrlScanResult(input, page, response);

  return {
    urlScan,
    dapScan,
    seoScan,
    thirdPartyScan,
    cookieScan,
    uswdsScan,
    loginScan,
    cmsScan,
    requiredLinksScan,
    searchScan,
    mobileScan,
  };
};
