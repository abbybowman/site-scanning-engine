/**
 * CreateWebsiteDto is the fields required to create a website.
 */
export class CreateWebsiteDto {
  website: string;
  topLevelDomain: string;
  branch: string;
  agency: string;
  agencyCode?: number;
  bureau: string;
  bureauCode?: number;
  sourceList: string;
}
