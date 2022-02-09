import { Test, TestingModule } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { Job } from 'bull';

import { CoreInputDto } from '@app/core-scanner/core.input.dto';
import { CoreResultService } from '@app/database/core-results/core-result.service';
import { SolutionsResultService } from '@app/database/solutions-results/solutions-result.service';

import { CoreResult } from 'entities/core-result.entity';
import { SolutionsResult } from 'entities/solutions-result.entity';
import { Scanner } from 'libs/scanner.interface';
import { CoreScannerService } from 'libs/core-scanner/src';

import { ScanEngineConsumer } from './scan-engine.consumer';
import { QueueService } from '@app/queue';

describe('ScanEngineConsumer', () => {
  let consumer: ScanEngineConsumer;
  let module: TestingModule;
  let mockCoreResultService: MockProxy<CoreResultService>;
  let mockCoreScanner: MockProxy<
    Scanner<
      CoreInputDto,
      { solutionsResult: SolutionsResult; coreResult: CoreResult }
    >
  >;
  let mockSolutionsResultService: MockProxy<SolutionsResultService>;
  let mockCoreJob: MockProxy<Job<CoreInputDto>>;
  let mockQueueService: MockProxy<QueueService>;

  beforeEach(async () => {
    mockCoreResultService = mock<CoreResultService>();
    mockCoreScanner = mock<
      Scanner<
        CoreInputDto,
        { solutionsResult: SolutionsResult; coreResult: CoreResult }
      >
    >({
      scan: async (input) => {
        return {
          solutionsResult: { id: input.websiteId } as SolutionsResult,
          coreResult: { id: input.websiteId } as CoreResult,
        };
      },
    });
    mockSolutionsResultService = mock<SolutionsResultService>();
    mockCoreJob = mock<Job<CoreInputDto>>();
    mockQueueService = mock<QueueService>();
    module = await Test.createTestingModule({
      providers: [
        ScanEngineConsumer,
        {
          provide: CoreResultService,
          useValue: mockCoreResultService,
        },
        {
          provide: QueueService,
          useValue: mockQueueService,
        },
        {
          provide: CoreScannerService,
          useValue: mockCoreScanner,
        },
        {
          provide: SolutionsResultService,
          useValue: mockSolutionsResultService,
        },
      ],
    }).compile();

    consumer = module.get<ScanEngineConsumer>(ScanEngineConsumer);
  });

  it('should be defined', () => {
    expect(consumer).toBeDefined();
  });

  it('should call the CoreResultService', async () => {
    const input: CoreInputDto = {
      websiteId: 1,
      url: 'https://18f.gov',
      scanId: '123',
    };

    mockCoreJob.data = input;

    const coreResult = new CoreResult();
    coreResult.id = 1;
    await consumer.processCore(mockCoreJob);
    expect(mockCoreResultService.create).toHaveBeenCalledWith(coreResult);
  });
});
