import { WebsiteService } from '@app/database/websites/websites.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CoreInputDto } from 'dtos/scanners/core.input.dto';
import { ProducerService } from '../producer/producer.service';

@Injectable()
export class TaskService {
  private readonly logger: Logger;
  constructor(
    private producerService: ProducerService,
    private websiteService: WebsiteService,
  ) {
    this.logger = new Logger(TaskService.name);
  }

  @Cron('46 * * * * *')
  async coreScanProducer() {
    this.logger.debug('Called at 46 seconds into every minute.');

    try {
      const websites = await this.websiteService.findAll();
      websites.forEach(website => {
        const coreInput: CoreInputDto = {
          url: website.url,
          agency: website.agency,
          branch: website.branch,
        };
        this.producerService.addCoreJob(coreInput);
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}