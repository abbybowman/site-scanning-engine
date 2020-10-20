import { CoreResultService } from '@app/database/core-results/core-result.service';
import { CORE_SCAN_JOB_NAME, SCANNER_QUEUE_NAME } from '@app/message-queue';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CoreInputDto } from '../../../../dtos/scanners/core.input.dto';
import { CoreScanner } from '../scanners/core/core.scanner';

/**
 * ScanEngineConsumer is a consumer of the Scanner message queue.
 *
 * @remarks the ScanEngineConsumer pulls work off of the Scanner queue and processes it.
 * The methods in ScanConsumer should use the `Process` decorator. This allows us to route
 * named jobs to the correct processor, e.g.
 *
 * ```ts
 * @Process('SomeNamedJob')
 * async processSomeNamedJob(job: Job<SomeNameJobDto>) {
 * ...
 * };
 * ```
 */
@Processor(SCANNER_QUEUE_NAME)
export class ScanEngineConsumer {
  private readonly logger: Logger;

  constructor(
    private coreScanner: CoreScanner,
    private coreResultService: CoreResultService,
  ) {
    this.logger = new Logger(ScanEngineConsumer.name);
  }

  /**
   * processCore processes the CoreScanner jobs from the queue.
   *
   * @param job a Bull.Job<CoreInputDto> object.
   */
  @Process(CORE_SCAN_JOB_NAME)
  async processCore(job: Job<CoreInputDto>) {
    this.logger.debug(`scanning ${job.data.url}`);

    try {
      const result = await this.coreScanner.scan(job.data);
      await this.coreResultService.create({
        targetUrl: result.targetUrl,
        finalUrl: result.finalUrl,
        agency: result.agency,
        branch: result.branch,
      });
      this.logger.debug('wrote result!');
      await job.moveToCompleted();
    } catch (error) {
      this.logger.error(error);
      await job.moveToFailed({
        message: error,
      });
    }
  }
}