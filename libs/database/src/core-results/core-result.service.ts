import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreResult } from './core-result.entity';
import { CreateCoreResultDto } from './dto/create-core-result.dto';

@Injectable()
export class CoreResultService {
  constructor(
    @InjectRepository(CoreResult) private coreResult: Repository<CoreResult>,
  ) {}

  async findAll(): Promise<CoreResult[]> {
    const results = await this.coreResult.find();
    return results;
  }

  async findOne(id: number): Promise<CoreResult> {
    const result = await this.coreResult.findOne(id);
    return result;
  }

  async create(createCoreResultDto: CreateCoreResultDto) {
    const coreResult = new CoreResult();
    coreResult.targetUrl = createCoreResultDto.targetUrl;
    coreResult.finalUrl = createCoreResultDto.finalUrl;
    coreResult.agency = createCoreResultDto.agency;
    coreResult.branch = createCoreResultDto.branch;
    await this.coreResult.save(coreResult);
  }
}