import { CoreResult } from 'entities/core-result.entity';
import { Website } from 'entities/website.entity';
import { CsvSerializer } from './csv-serializer';

describe('CsvSerializer', () => {
  it('returns headers when no data is passed', () => {
    const serializer = new CsvSerializer(CoreResult.snapshotColumnOrder);

    const result = serializer.serialize([]);
    const expectedResult =
      '"target_url","target_url_domain","target_url_top_level_domain","target_url_redirects","final_url","final_url_domain","final_url_top_level_domain","final_url_website","final_url_live","final_url_status_code","final_url_media_type","final_url_same_domain","final_url_same_website","target_url_agency_owner","target_url_bureau_owner","target_url_branch","target_url_404_test","source_list","public","scan_date","primary_scan_status","accessibility_scan_status","dns_scan_status","not_found_scan_status","performance_scan_status","robots_txt_scan_status","security_scan_status","sitemap_xml_scan_status","ipv6","hostname","cms","login_provider","login","site_search","search_dot_gov","dap","dap_parameters","third_party_service_domains","third_party_service_count","cookie_domains","viewport_meta_tag","cumulative_layout_shift","largest_contentful_paint","required_links_url","required_links_text","https_enforced","hsts","title","description","keywords","og_title","og_description","og_article_published","og_article_modified","og_image","og_type","og_url","canonical_link","language","language_link","main_element_present","robots_txt_detected","robots_txt_target_url_redirects","robots_txt_final_url","robots_txt_final_url_live","robots_txt_final_url_status_code","robots_txt_final_url_media_type","robots_txt_final_url_filesize","robots_txt_crawl_delay","robots_txt_sitemap_locations","sitemap_xml_detected","sitemap_xml_target_url_redirects","sitemap_xml_final_url","sitemap_xml_final_url_live","sitemap_xml_final_url_status_code","sitemap_xml_final_url_media_type","sitemap_xml_final_url_filesize","sitemap_xml_count","sitemap_xml_pdf_count","uswds_favicon","uswds_favicon_in_css","uswds_publicsans_font","uswds_inpage_css","uswds_usa_class_list","uswds_usa_classes","uswds_string","uswds_string_in_css","uswds_semantic_version","uswds_version","uswds_count"';

    expect(result).toEqual(expectedResult);
  });

  it('serializes an array containing one website', () => {
    const serializer = new CsvSerializer(CoreResult.snapshotColumnOrder);
    const website = new Website();
    const coreResult = new CoreResult();
    website.url = '18f.gov';
    website.coreResult = coreResult;

    const result = serializer.serialize([website]);
    const expectedResult =
      '"target_url","target_url_domain","target_url_top_level_domain","target_url_redirects","final_url","final_url_domain","final_url_top_level_domain","final_url_website","final_url_live","final_url_status_code","final_url_media_type","final_url_same_domain","final_url_same_website","target_url_agency_owner","target_url_bureau_owner","target_url_branch","target_url_404_test","source_list","public","scan_date","primary_scan_status","accessibility_scan_status","dns_scan_status","not_found_scan_status","performance_scan_status","robots_txt_scan_status","security_scan_status","sitemap_xml_scan_status","ipv6","hostname","cms","login_provider","login","site_search","search_dot_gov","dap","dap_parameters","third_party_service_domains","third_party_service_count","cookie_domains","viewport_meta_tag","cumulative_layout_shift","largest_contentful_paint","required_links_url","required_links_text","https_enforced","hsts","title","description","keywords","og_title","og_description","og_article_published","og_article_modified","og_image","og_type","og_url","canonical_link","language","language_link","main_element_present","robots_txt_detected","robots_txt_target_url_redirects","robots_txt_final_url","robots_txt_final_url_live","robots_txt_final_url_status_code","robots_txt_final_url_media_type","robots_txt_final_url_filesize","robots_txt_crawl_delay","robots_txt_sitemap_locations","sitemap_xml_detected","sitemap_xml_target_url_redirects","sitemap_xml_final_url","sitemap_xml_final_url_live","sitemap_xml_final_url_status_code","sitemap_xml_final_url_media_type","sitemap_xml_final_url_filesize","sitemap_xml_count","sitemap_xml_pdf_count","uswds_favicon","uswds_favicon_in_css","uswds_publicsans_font","uswds_inpage_css","uswds_usa_class_list","uswds_usa_classes","uswds_string","uswds_string_in_css","uswds_semantic_version","uswds_version","uswds_count"\r\n"18f.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

    expect(result).toEqual(expectedResult);
  });

  it('serializes an array containing more than one website', () => {
    const serializer = new CsvSerializer(CoreResult.snapshotColumnOrder);
    const firstWebsite = new Website();
    const firstCoreResult = new CoreResult();
    firstWebsite.url = '18f.gov';
    firstWebsite.coreResult = firstCoreResult;
    const secondWebsite = new Website();
    const secondCoreResult = new CoreResult();
    secondWebsite.url = 'nasa.gov';
    secondWebsite.coreResult = secondCoreResult;

    const result = serializer.serialize([firstWebsite, secondWebsite]);
    const expectedResult =
      '"target_url","target_url_domain","target_url_top_level_domain","target_url_redirects","final_url","final_url_domain","final_url_top_level_domain","final_url_website","final_url_live","final_url_status_code","final_url_media_type","final_url_same_domain","final_url_same_website","target_url_agency_owner","target_url_bureau_owner","target_url_branch","target_url_404_test","source_list","public","scan_date","primary_scan_status","accessibility_scan_status","dns_scan_status","not_found_scan_status","performance_scan_status","robots_txt_scan_status","security_scan_status","sitemap_xml_scan_status","ipv6","hostname","cms","login_provider","login","site_search","search_dot_gov","dap","dap_parameters","third_party_service_domains","third_party_service_count","cookie_domains","viewport_meta_tag","cumulative_layout_shift","largest_contentful_paint","required_links_url","required_links_text","https_enforced","hsts","title","description","keywords","og_title","og_description","og_article_published","og_article_modified","og_image","og_type","og_url","canonical_link","language","language_link","main_element_present","robots_txt_detected","robots_txt_target_url_redirects","robots_txt_final_url","robots_txt_final_url_live","robots_txt_final_url_status_code","robots_txt_final_url_media_type","robots_txt_final_url_filesize","robots_txt_crawl_delay","robots_txt_sitemap_locations","sitemap_xml_detected","sitemap_xml_target_url_redirects","sitemap_xml_final_url","sitemap_xml_final_url_live","sitemap_xml_final_url_status_code","sitemap_xml_final_url_media_type","sitemap_xml_final_url_filesize","sitemap_xml_count","sitemap_xml_pdf_count","uswds_favicon","uswds_favicon_in_css","uswds_publicsans_font","uswds_inpage_css","uswds_usa_class_list","uswds_usa_classes","uswds_string","uswds_string_in_css","uswds_semantic_version","uswds_version","uswds_count"\r\n"18f.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n"nasa.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

    expect(result).toEqual(expectedResult);
  });

  it('serializes an array containing one website with dap parameters', () => {
    const serializer = new CsvSerializer(CoreResult.snapshotColumnOrder);
    const website = new Website();
    const coreResult = new CoreResult();
    coreResult.dapParameters = 'agency=GSA&subagency=TTS,18F';
    website.url = '18f.gov';
    website.coreResult = coreResult;

    const result = serializer.serialize([website]);
    const expectedResult =
      '"target_url","target_url_domain","target_url_top_level_domain","target_url_redirects","final_url","final_url_domain","final_url_top_level_domain","final_url_website","final_url_live","final_url_status_code","final_url_media_type","final_url_same_domain","final_url_same_website","target_url_agency_owner","target_url_bureau_owner","target_url_branch","target_url_404_test","source_list","public","scan_date","primary_scan_status","accessibility_scan_status","dns_scan_status","not_found_scan_status","performance_scan_status","robots_txt_scan_status","security_scan_status","sitemap_xml_scan_status","ipv6","hostname","cms","login_provider","login","site_search","search_dot_gov","dap","dap_parameters","third_party_service_domains","third_party_service_count","cookie_domains","viewport_meta_tag","cumulative_layout_shift","largest_contentful_paint","required_links_url","required_links_text","https_enforced","hsts","title","description","keywords","og_title","og_description","og_article_published","og_article_modified","og_image","og_type","og_url","canonical_link","language","language_link","main_element_present","robots_txt_detected","robots_txt_target_url_redirects","robots_txt_final_url","robots_txt_final_url_live","robots_txt_final_url_status_code","robots_txt_final_url_media_type","robots_txt_final_url_filesize","robots_txt_crawl_delay","robots_txt_sitemap_locations","sitemap_xml_detected","sitemap_xml_target_url_redirects","sitemap_xml_final_url","sitemap_xml_final_url_live","sitemap_xml_final_url_status_code","sitemap_xml_final_url_media_type","sitemap_xml_final_url_filesize","sitemap_xml_count","sitemap_xml_pdf_count","uswds_favicon","uswds_favicon_in_css","uswds_publicsans_font","uswds_inpage_css","uswds_usa_class_list","uswds_usa_classes","uswds_string","uswds_string_in_css","uswds_semantic_version","uswds_version","uswds_count"\r\n"18f.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"{""agency"":""GSA"",""subagency"":""TTS,18F""}",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

    expect(result).toEqual(expectedResult);
  });

  it('serializes an array containing more than one website with dap parameters', () => {
    const serializer = new CsvSerializer(CoreResult.snapshotColumnOrder);
    const firstWebsite = new Website();
    const firstCoreResult = new CoreResult();
    firstCoreResult.dapParameters = 'agency=GSA&subagency=TTS,18F';
    firstWebsite.url = '18f.gov';
    firstWebsite.coreResult = firstCoreResult;

    const secondWebsite = new Website();
    const secondCoreResult = new CoreResult();
    secondCoreResult.dapParameters = 'agency=AmeriCorps&cto=12';
    secondWebsite.url = 'mentor.gov';
    secondWebsite.coreResult = secondCoreResult;

    const result = serializer.serialize([firstWebsite, secondWebsite]);
    const expectedResult =
      '"target_url","target_url_domain","target_url_top_level_domain","target_url_redirects","final_url","final_url_domain","final_url_top_level_domain","final_url_website","final_url_live","final_url_status_code","final_url_media_type","final_url_same_domain","final_url_same_website","target_url_agency_owner","target_url_bureau_owner","target_url_branch","target_url_404_test","source_list","public","scan_date","primary_scan_status","accessibility_scan_status","dns_scan_status","not_found_scan_status","performance_scan_status","robots_txt_scan_status","security_scan_status","sitemap_xml_scan_status","ipv6","hostname","cms","login_provider","login","site_search","search_dot_gov","dap","dap_parameters","third_party_service_domains","third_party_service_count","cookie_domains","viewport_meta_tag","cumulative_layout_shift","largest_contentful_paint","required_links_url","required_links_text","https_enforced","hsts","title","description","keywords","og_title","og_description","og_article_published","og_article_modified","og_image","og_type","og_url","canonical_link","language","language_link","main_element_present","robots_txt_detected","robots_txt_target_url_redirects","robots_txt_final_url","robots_txt_final_url_live","robots_txt_final_url_status_code","robots_txt_final_url_media_type","robots_txt_final_url_filesize","robots_txt_crawl_delay","robots_txt_sitemap_locations","sitemap_xml_detected","sitemap_xml_target_url_redirects","sitemap_xml_final_url","sitemap_xml_final_url_live","sitemap_xml_final_url_status_code","sitemap_xml_final_url_media_type","sitemap_xml_final_url_filesize","sitemap_xml_count","sitemap_xml_pdf_count","uswds_favicon","uswds_favicon_in_css","uswds_publicsans_font","uswds_inpage_css","uswds_usa_class_list","uswds_usa_classes","uswds_string","uswds_string_in_css","uswds_semantic_version","uswds_version","uswds_count"\r\n"18f.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"{""agency"":""GSA"",""subagency"":""TTS,18F""}",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\r\n"mentor.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"{""agency"":""AmeriCorps"",""cto"":""12""}",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

    expect(result).toEqual(expectedResult);
  });

  it('serializes a csv file and removes newline characters in the process', () => {
    const serializer = new CsvSerializer(CoreResult.snapshotColumnOrder);
    const website = new Website();
    const coreResult = new CoreResult();
    coreResult.ogDescriptionFinalUrl = 'Yadda \nYadda \nYadda';
    website.url = '18f.gov';
    website.coreResult = coreResult;

    const result = serializer.serialize([website]);
    const expectedResult =
      '"target_url","target_url_domain","target_url_top_level_domain","target_url_redirects","final_url","final_url_domain","final_url_top_level_domain","final_url_website","final_url_live","final_url_status_code","final_url_media_type","final_url_same_domain","final_url_same_website","target_url_agency_owner","target_url_bureau_owner","target_url_branch","target_url_404_test","source_list","public","scan_date","primary_scan_status","accessibility_scan_status","dns_scan_status","not_found_scan_status","performance_scan_status","robots_txt_scan_status","security_scan_status","sitemap_xml_scan_status","ipv6","hostname","cms","login_provider","login","site_search","search_dot_gov","dap","dap_parameters","third_party_service_domains","third_party_service_count","cookie_domains","viewport_meta_tag","cumulative_layout_shift","largest_contentful_paint","required_links_url","required_links_text","https_enforced","hsts","title","description","keywords","og_title","og_description","og_article_published","og_article_modified","og_image","og_type","og_url","canonical_link","language","language_link","main_element_present","robots_txt_detected","robots_txt_target_url_redirects","robots_txt_final_url","robots_txt_final_url_live","robots_txt_final_url_status_code","robots_txt_final_url_media_type","robots_txt_final_url_filesize","robots_txt_crawl_delay","robots_txt_sitemap_locations","sitemap_xml_detected","sitemap_xml_target_url_redirects","sitemap_xml_final_url","sitemap_xml_final_url_live","sitemap_xml_final_url_status_code","sitemap_xml_final_url_media_type","sitemap_xml_final_url_filesize","sitemap_xml_count","sitemap_xml_pdf_count","uswds_favicon","uswds_favicon_in_css","uswds_publicsans_font","uswds_inpage_css","uswds_usa_class_list","uswds_usa_classes","uswds_string","uswds_string_in_css","uswds_semantic_version","uswds_version","uswds_count"\r\n"18f.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"Yadda Yadda Yadda",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

    expect(result).toEqual(expectedResult);
  });

  it('serializes a csv file and truncates strings that contain more than 5000 characters', () => {
    const serializer = new CsvSerializer(CoreResult.snapshotColumnOrder);
    const website = new Website();
    const coreResult = new CoreResult();
    const longString = generateLongString(6000);
    coreResult.ogDescriptionFinalUrl = longString;
    website.url = '18f.gov';
    website.coreResult = coreResult;

    const expectedTruncatedLongString = longString.substring(0, 2000);
    const result = serializer.serialize([website]);
    const expectedResult =
      '"target_url","target_url_domain","target_url_top_level_domain","target_url_redirects","final_url","final_url_domain","final_url_top_level_domain","final_url_website","final_url_live","final_url_status_code","final_url_media_type","final_url_same_domain","final_url_same_website","target_url_agency_owner","target_url_bureau_owner","target_url_branch","target_url_404_test","source_list","public","scan_date","primary_scan_status","accessibility_scan_status","dns_scan_status","not_found_scan_status","performance_scan_status","robots_txt_scan_status","security_scan_status","sitemap_xml_scan_status","ipv6","hostname","cms","login_provider","login","site_search","search_dot_gov","dap","dap_parameters","third_party_service_domains","third_party_service_count","cookie_domains","viewport_meta_tag","cumulative_layout_shift","largest_contentful_paint","required_links_url","required_links_text","https_enforced","hsts","title","description","keywords","og_title","og_description","og_article_published","og_article_modified","og_image","og_type","og_url","canonical_link","language","language_link","main_element_present","robots_txt_detected","robots_txt_target_url_redirects","robots_txt_final_url","robots_txt_final_url_live","robots_txt_final_url_status_code","robots_txt_final_url_media_type","robots_txt_final_url_filesize","robots_txt_crawl_delay","robots_txt_sitemap_locations","sitemap_xml_detected","sitemap_xml_target_url_redirects","sitemap_xml_final_url","sitemap_xml_final_url_live","sitemap_xml_final_url_status_code","sitemap_xml_final_url_media_type","sitemap_xml_final_url_filesize","sitemap_xml_count","sitemap_xml_pdf_count","uswds_favicon","uswds_favicon_in_css","uswds_publicsans_font","uswds_inpage_css","uswds_usa_class_list","uswds_usa_classes","uswds_string","uswds_string_in_css","uswds_semantic_version","uswds_version","uswds_count"\r\n"18f.gov",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,"' +
      expectedTruncatedLongString +
      '",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

    expect(result).toEqual(expectedResult);
  });
});

function generateLongString(characterLimit: number): string {
  let longString = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < characterLimit; i++) {
    longString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return longString;
}
