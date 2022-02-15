import { HttpService, HttpStatus } from '@nestjs/common';
import { Agent } from 'https';
import { v4 } from 'uuid';

import { getHttpsUrl } from './helpers';

export const createNotFoundScanner = async (
  httpService: HttpService,
  url: string,
) => {
  const httpsUrl = getHttpsUrl(url);
  const randomUrl = new URL(httpsUrl);
  randomUrl.pathname = `not-found-test${v4()}`;

  const agent = new Agent({
    rejectUnauthorized: false, // lgtm[js/disabling-certificate-validation]
  });

  const resp = await httpService
    .get(randomUrl.toString(), {
      validateStatus: () => {
        return true;
      },
      httpsAgent: agent,
    })
    .toPromise();

  return resp.status == HttpStatus.NOT_FOUND;
};