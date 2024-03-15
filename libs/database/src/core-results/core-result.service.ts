import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CoreResult } from 'entities/core-result.entity';
import { Website } from 'entities/website.entity';
import { ScanStatus } from 'entities/scan-status';
import { CoreResultPages } from 'entities/core-result.entity';

@Injectable()
export class CoreResultService {
  constructor(
    @InjectRepository(CoreResult)
    private coreResultRepository: Repository<CoreResult>,
  ) {}

  async findAll(): Promise<CoreResult[]> {
    const results = await this.coreResultRepository.find();
    return results;
  }

  createFromCoreResultPages(
    websiteId: number,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    const coreResult = new CoreResult();
    const website = new Website();
    website.id = websiteId;
    coreResult.website = website;
    coreResult.targetUrlBaseDomain = pages.base.targetUrlBaseDomain;

    this.updatePrimaryScanResults(coreResult, pages, logger);
    this.updateNotFoundScanResults(coreResult, pages, logger);
    this.updateRobotsTxtScanResults(coreResult, pages, logger);
    this.updateSitemapXmlScanResults(coreResult, pages, logger);
    this.updateDnsScanResults(coreResult, pages, logger);
    this.updateAccessibilityScanResults(coreResult, pages, logger);
    this.updatePerformanceScanResults(coreResult, pages, logger);

    return this.create(coreResult);
  }

  async create(coreResult: CoreResult) {
    const exists = await this.coreResultRepository.findOne({
      where: {
        website: {
          id: coreResult.website.id,
        },
      },
    });

    if (exists) {
      await this.coreResultRepository.update(exists.id, coreResult);
    } else {
      await this.coreResultRepository.insert(coreResult);
    }
  }

  async findOne(id: number): Promise<CoreResult> {
    return await this.coreResultRepository.findOneBy({ id: id });
  }

  private updatePrimaryScanResults(
    coreResult: CoreResult,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    coreResult.primaryScanStatus = pages.primary.status;

    if (pages.primary.status === ScanStatus.Completed) {
      const result = pages.primary.result;
      // DAP scan
      coreResult.dapDetected = result.dapScan.dapDetected;
      coreResult.dapParameters = result.dapScan.dapParameters;

      // SEO scan
      coreResult.mainElementFinalUrl = result.seoScan.mainElementFinalUrl;
      coreResult.ogArticleModifiedFinalUrl =
        result.seoScan.ogArticleModifiedFinalUrl;
      coreResult.ogArticlePublishedFinalUrl =
        result.seoScan.ogArticlePublishedFinalUrl;
      coreResult.ogDescriptionFinalUrl = result.seoScan.ogDescriptionFinalUrl;
      coreResult.ogTitleFinalUrl = result.seoScan.ogTitleFinalUrl;
      coreResult.canonicalLink = result.seoScan.canonicalLink;
      coreResult.pageTitle = result.seoScan.pageTitle;
      coreResult.metaDescriptionContent = result.seoScan.metaDescriptionContent;
      coreResult.hreflangCodes = result.seoScan.hreflangCodes;
      /**
       * The following fields are experimental and were added in March 2024 for
       * prototyping purposes. They are not yet used in the application and may be
       * removed in the future.
       */
      coreResult.metaKeywordsContent = result.seoScan.metaKeywordsContent;
      coreResult.metaRobotsContent = result.seoScan.metaRobotsContent;
      coreResult.metaArticleSectionContent =
        result.seoScan.metaArticleSectionContent;
      coreResult.metaArticleTagContent = result.seoScan.metaArticleTagContent;
      coreResult.ogImageFinalUrl = result.seoScan.ogImageFinalUrl;
      coreResult.dctermsKeywordsContent = result.seoScan.dctermsKeywordsContent;
      coreResult.dcSubjectContent = result.seoScan.dcSubjectContent;
      coreResult.dctermsSubjectContent = result.seoScan.dctermsSubjectContent;
      coreResult.dctermsAudienceContent = result.seoScan.dctermsAudienceContent;
      coreResult.dcTypeContent = result.seoScan.dcTypeContent;
      coreResult.dctermsTypeContent = result.seoScan.dctermsTypeContent;
      coreResult.dcDateContent = result.seoScan.dcDateContent;
      coreResult.dcDateCreatedContent = result.seoScan.dcDateCreatedContent;
      coreResult.dctermsCreatedContent = result.seoScan.dctermsCreatedContent;
      coreResult.ogLocaleContent = result.seoScan.ogLocaleContent;
      coreResult.ogSiteNameContent = result.seoScan.ogSiteNameContent;
      coreResult.ogTypeContent = result.seoScan.ogTypeContent;
      coreResult.ogUrlContent = result.seoScan.ogUrlContent;
      coreResult.ogImageAltContent = result.seoScan.ogImageAltContent;
      coreResult.revisedContent = result.seoScan.revisedContent;
      coreResult.lastModifiedContent = result.seoScan.lastModifiedContent;
      coreResult.languageContent = result.seoScan.languageContent;
      coreResult.dateContent = result.seoScan.dateContent;
      coreResult.subjectContent = result.seoScan.subjectContent;
      coreResult.ownerContent = result.seoScan.ownerContent;
      coreResult.pagenameContent = result.seoScan.pagenameContent;
      coreResult.dcTitleContent = result.seoScan.dcTitleContent;
      coreResult.ogSiteName = result.seoScan.ogSiteName;
      coreResult.itemTypeContent = result.seoScan.itemTypeContent;
      coreResult.itemScopeContent = result.seoScan.itemScopeContent;
      coreResult.itemPropContent = result.seoScan.itemPropContent;
      coreResult.vocabContent = result.seoScan.vocabContent;
      coreResult.typeOfContent = result.seoScan.typeOfContent;
      coreResult.propertyContent = result.seoScan.propertyContent;
      coreResult.contextContent = result.seoScan.contextContent;
      coreResult.typeContent = result.seoScan.typeContent;
      coreResult.htmlLangContent = result.seoScan.htmlLangContent;
      coreResult.hrefLangContent = result.seoScan.hrefLangContent;
      coreResult.meContent = result.seoScan.meContent;
      /**
       * End experimental fields.
       */

      // Third-party scan
      coreResult.thirdPartyServiceCount =
        result.thirdPartyScan.thirdPartyServiceCount;
      coreResult.thirdPartyServiceDomains =
        result.thirdPartyScan.thirdPartyServiceDomains;

      // Cookie scan
      coreResult.cookieDomains = result.cookieScan.domains;

      // Url scan
      coreResult.finalUrl = result.urlScan.finalUrl;
      coreResult.finalUrlBaseDomain = result.urlScan.finalUrlBaseDomain;
      coreResult.finalUrlWebsite = result.urlScan.finalUrlWebsite;
      coreResult.finalUrlTopLevelDomain = result.urlScan.finalUrlTopLevelDomain;
      coreResult.finalUrlIsLive = result.urlScan.finalUrlIsLive;
      coreResult.finalUrlMIMEType = result.urlScan.finalUrlMIMEType;
      coreResult.finalUrlSameDomain = result.urlScan.finalUrlSameDomain;
      coreResult.finalUrlSameWebsite = result.urlScan.finalUrlSameWebsite;
      coreResult.finalUrlStatusCode = result.urlScan.finalUrlStatusCode;
      coreResult.targetUrlRedirects = result.urlScan.targetUrlRedirects;

      // USWDS scan
      coreResult.usaClasses = result.uswdsScan.usaClasses;
      coreResult.uswdsString = result.uswdsScan.uswdsString;
      coreResult.uswdsInlineCss = result.uswdsScan.uswdsInlineCss;
      coreResult.uswdsUsFlag = result.uswdsScan.uswdsUsFlag;
      coreResult.uswdsUsFlagInCss = result.uswdsScan.uswdsUsFlagInCss;
      coreResult.uswdsStringInCss = result.uswdsScan.uswdsStringInCss;
      coreResult.uswdsPublicSansFont = result.uswdsScan.uswdsPublicSansFont;
      coreResult.uswdsSemanticVersion = result.uswdsScan.uswdsSemanticVersion;
      coreResult.uswdsVersion = result.uswdsScan.uswdsVersion;
      coreResult.uswdsCount = result.uswdsScan.uswdsCount;

      // Login scan
      coreResult.loginDetected = result.loginScan.loginDetected;
      coreResult.loginProvider = result.loginScan.loginProvider;

      // CMS scan
      coreResult.cms = result.cmsScan.cms;

      // Required links scan
      coreResult.requiredLinksUrl = result.requiredLinksScan.requiredLinksUrl;
      coreResult.requiredLinksText = result.requiredLinksScan.requiredLinksText;

      // Search scan
      coreResult.searchDetected = result.searchScan.searchDetected;
      coreResult.searchgov = result.searchScan.searchgov;

      // Mobile scan
      coreResult.viewportMetaTag = result.mobileScan.viewportMetaTag;
    } else {
      logger.error({
        msg: pages.primary.error,
        page: 'primary',
      });

      coreResult.dapDetected = null;
      coreResult.dapParameters = null;
      coreResult.mainElementFinalUrl = null;
      coreResult.ogArticleModifiedFinalUrl = null;
      coreResult.ogArticlePublishedFinalUrl = null;
      coreResult.ogDescriptionFinalUrl = null;
      coreResult.ogTitleFinalUrl = null;
      coreResult.canonicalLink = null;
      coreResult.thirdPartyServiceCount = null;
      coreResult.thirdPartyServiceDomains = null;
      coreResult.finalUrl = null;
      coreResult.finalUrlBaseDomain = null;
      coreResult.finalUrlWebsite = null;
      coreResult.finalUrlTopLevelDomain = null;
      coreResult.finalUrlIsLive = null;
      coreResult.finalUrlMIMEType = null;
      coreResult.finalUrlSameDomain = null;
      coreResult.finalUrlSameWebsite = null;
      coreResult.finalUrlStatusCode = null;
      coreResult.targetUrlRedirects = null;
      coreResult.usaClasses = null;
      coreResult.uswdsString = null;
      coreResult.uswdsInlineCss = null;
      coreResult.uswdsUsFlag = null;
      coreResult.uswdsUsFlagInCss = null;
      coreResult.uswdsStringInCss = null;
      coreResult.uswdsPublicSansFont = null;
      coreResult.uswdsSemanticVersion = null;
      coreResult.uswdsVersion = null;
      coreResult.uswdsCount = null;
      coreResult.loginDetected = null;
      coreResult.loginProvider = null;
      coreResult.cms = null;
      coreResult.requiredLinksUrl = null;
      coreResult.requiredLinksText = null;
      coreResult.searchDetected = null;
      coreResult.searchgov = null;
      coreResult.viewportMetaTag = null;
      /**
       * #852
       * The following fields are experimental and were added in March 2024 for
       * prototyping purposes. They are not yet used in the application and may be
       * removed in the future.
       */
      coreResult.metaKeywordsContent = null;
      coreResult.metaRobotsContent = null;
      coreResult.metaArticleSectionContent = null;
      coreResult.metaArticleTagContent = null;
      coreResult.ogImageFinalUrl = null;
      coreResult.dctermsKeywordsContent = null;
      coreResult.dcSubjectContent = null;
      coreResult.dctermsSubjectContent = null;
      coreResult.dctermsAudienceContent = null;
      coreResult.dcTypeContent = null;
      coreResult.dctermsTypeContent = null;
      coreResult.dcDateContent = null;
      coreResult.dcDateCreatedContent = null;
      coreResult.dctermsCreatedContent = null;
      coreResult.ogLocaleContent = null;
      coreResult.ogSiteNameContent = null;
      coreResult.ogTypeContent = null;
      coreResult.ogUrlContent = null;
      coreResult.ogImageAltContent = null;
      coreResult.revisedContent = null;
      coreResult.lastModifiedContent = null;
      coreResult.languageContent = null;
      coreResult.dateContent = null;
      coreResult.subjectContent = null;
      coreResult.ownerContent = null;
      coreResult.pagenameContent = null;
      coreResult.dcTitleContent = null;
      coreResult.ogSiteName = null;
      coreResult.itemTypeContent = null;
      coreResult.itemScopeContent = null;
      coreResult.itemPropContent = null;
      coreResult.vocabContent = null;
      coreResult.typeOfContent = null;
      coreResult.propertyContent = null;
      coreResult.contextContent = null;
      coreResult.typeContent = null;
      coreResult.htmlLangContent = null;
      coreResult.hrefLangContent = null;
      coreResult.meContent = null;
      /**
       * End experimental fields.
       */
    }
  }

  private updateNotFoundScanResults(
    coreResult: CoreResult,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    coreResult.notFoundScanStatus = pages.notFound.status;

    if (pages.notFound.status === ScanStatus.Completed) {
      coreResult.targetUrl404Test =
        pages.notFound.result.notFoundScan.targetUrl404Test;
    } else {
      logger.error({
        msg: pages.notFound.error,
        page: 'notFound',
      });

      coreResult.targetUrl404Test = null;
    }
  }

  private updateRobotsTxtScanResults(
    coreResult: CoreResult,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    coreResult.robotsTxtScanStatus = pages.robotsTxt.status;

    if (pages.robotsTxt.status === ScanStatus.Completed) {
      const robotsTxt = pages.robotsTxt.result.robotsTxtScan;
      coreResult.robotsTxtFinalUrlSize = robotsTxt.robotsTxtFinalUrlSize;
      coreResult.robotsTxtCrawlDelay = robotsTxt.robotsTxtCrawlDelay;
      coreResult.robotsTxtSitemapLocations =
        robotsTxt.robotsTxtSitemapLocations;
      coreResult.robotsTxtFinalUrl = robotsTxt.robotsTxtFinalUrl;
      coreResult.robotsTxtFinalUrlLive = robotsTxt.robotsTxtFinalUrlLive;
      coreResult.robotsTxtTargetUrlRedirects =
        robotsTxt.robotsTxtTargetUrlRedirects;
      coreResult.robotsTxtFinalUrlMimeType =
        robotsTxt.robotsTxtFinalUrlMimeType;
      coreResult.robotsTxtStatusCode = robotsTxt.robotsTxtStatusCode;
      coreResult.robotsTxtDetected = robotsTxt.robotsTxtDetected;
    } else {
      logger.error({
        msg: pages.robotsTxt.error,
        page: 'robotsTxt',
      });

      coreResult.robotsTxtFinalUrlSize = null;
      coreResult.robotsTxtCrawlDelay = null;
      coreResult.robotsTxtSitemapLocations = null;
      coreResult.robotsTxtFinalUrl = null;
      coreResult.robotsTxtFinalUrlLive = null;
      coreResult.robotsTxtTargetUrlRedirects = null;
      coreResult.robotsTxtFinalUrlMimeType = null;
      coreResult.robotsTxtStatusCode = null;
      coreResult.robotsTxtDetected = null;
    }
  }

  private updateSitemapXmlScanResults(
    coreResult: CoreResult,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    coreResult.sitemapXmlScanStatus = pages.sitemapXml.status;

    if (pages.sitemapXml.status === ScanStatus.Completed) {
      const sitemap = pages.sitemapXml.result.sitemapXmlScan;
      coreResult.sitemapXmlFinalUrlFilesize =
        sitemap.sitemapXmlFinalUrlFilesize;
      coreResult.sitemapXmlCount = sitemap.sitemapXmlCount;
      coreResult.sitemapXmlPdfCount = sitemap.sitemapXmlPdfCount;
      coreResult.sitemapXmlFinalUrl = sitemap.sitemapXmlFinalUrl;
      coreResult.sitemapXmlFinalUrlLive = sitemap.sitemapXmlFinalUrlLive;
      coreResult.sitemapTargetUrlRedirects = sitemap.sitemapTargetUrlRedirects;
      coreResult.sitemapXmlFinalUrlMimeType =
        sitemap.sitemapXmlFinalUrlMimeType;
      coreResult.sitemapXmlStatusCode = sitemap.sitemapXmlStatusCode;
      coreResult.sitemapXmlDetected = sitemap.sitemapXmlDetected;
    } else {
      logger.error({
        msg: pages.sitemapXml.error,
        page: 'sitemap.xml',
      });

      coreResult.sitemapXmlFinalUrlFilesize = null;
      coreResult.sitemapXmlCount = null;
      coreResult.sitemapXmlPdfCount = null;
      coreResult.sitemapXmlFinalUrl = null;
      coreResult.sitemapXmlFinalUrlLive = null;
      coreResult.sitemapTargetUrlRedirects = null;
      coreResult.sitemapXmlFinalUrlMimeType = null;
      coreResult.sitemapXmlStatusCode = null;
      coreResult.sitemapXmlDetected = null;
    }
  }

  private updateDnsScanResults(
    coreResult: CoreResult,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    coreResult.dnsScanStatus = pages.dns.status;

    if (pages.dns.status === ScanStatus.Completed) {
      coreResult.dnsIpv6 = pages.dns.result.dnsScan.ipv6;
      coreResult.dnsHostname = pages.dns.result.dnsScan.dnsHostname;
    } else {
      logger.error({
        msg: pages.dns.error,
        page: 'dns',
      });

      coreResult.dnsIpv6 = null;
      coreResult.dnsHostname = null;
    }
  }

  private updateAccessibilityScanResults(
    coreResult: CoreResult,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    coreResult.accessibilityScanStatus = pages.accessibility.status;

    if (pages.accessibility.status === ScanStatus.Completed) {
      coreResult.accessibilityViolations =
        pages.accessibility.result.accessibilityScan.accessibilityViolations;
      coreResult.accessibilityViolationsList =
        pages.accessibility.result.accessibilityScan.accessibilityViolationsList;
    } else {
      logger.error({
        msg: pages.accessibility.error,
        page: 'accessibility',
      });

      coreResult.accessibilityViolations = null;
      coreResult.accessibilityViolationsList = null;
    }
  }

  private updatePerformanceScanResults(
    coreResult: CoreResult,
    pages: CoreResultPages,
    logger: Logger,
  ) {
    coreResult.performanceScanStatus = pages.performance.status;

    if (pages.performance.status === ScanStatus.Completed) {
      coreResult.largestContentfulPaint =
        pages.performance.result.performanceScan.largestContentfulPaint;

      coreResult.cumulativeLayoutShift =
        pages.performance.result.performanceScan.cumulativeLayoutShift;
    } else {
      logger.error({
        msg: pages.performance.error,
        page: 'performance',
      });

      coreResult.largestContentfulPaint = null;
      coreResult.cumulativeLayoutShift = null;
    }
  }
}
