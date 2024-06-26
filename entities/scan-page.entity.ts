import { ScanStatus } from 'entities/scan-status';
import * as ScanData from './scan-data.entity';

// A page scan includes scan data and a status of "completed", or a non-completed status.
type PageScan<T> =
  | {
      status: ScanStatus.Completed;
      result: T;
      error?: null;
    }
  | {
      status: Exclude<ScanStatus, ScanStatus.Completed>;
      error: string;
    };

export type PrimaryScans = {
  urlScan: ScanData.UrlScan;
  dapScan: ScanData.DapScan;
  seoScan: ScanData.SeoScan;
  thirdPartyScan: ScanData.ThirdPartyScan;
  cookieScan: ScanData.CookieScan;
  uswdsScan: ScanData.UswdsScan;
  loginScan: ScanData.LoginScan;
  cmsScan: ScanData.CmsScan;
  requiredLinksScan: ScanData.RequiredLinksScan;
  searchScan: ScanData.SearchScan;
  mobileScan: ScanData.MobileScan;
};
export type PrimaryScan = PageScan<PrimaryScans>;

export type RobotsTxtPageScans = {
  robotsTxtScan: ScanData.RobotsTxtScan;
};
export type RobotsTxtPageScan = PageScan<RobotsTxtPageScans>;

export type SitemapXmlPageScans = {
  sitemapXmlScan: ScanData.SitemapXmlScan;
};
export type SitemapXmlPageScan = PageScan<SitemapXmlPageScans>;

export type NotFoundPageScans = {
  notFoundScan: ScanData.NotFoundScan;
};
export type NotFoundPageScan = PageScan<NotFoundPageScans>;

export type DnsScans = {
  dnsScan: ScanData.DnsScan;
};
export type DnsPageScan = PageScan<DnsScans>;

export type AccessibilityScans = {
  accessibilityScan: ScanData.AccessibilityScan;
};

export type AccessibilityPageScan = PageScan<AccessibilityScans>;

export type PerformanceScans = {
  performanceScan: ScanData.PerformanceScan;
};

export type PerformancePageScan = PageScan<PerformanceScans>;

export type SecurityScans = {
  securityScan: ScanData.SecurityScan;
};

export type SecurityPageScan = PageScan<SecurityScans>;
