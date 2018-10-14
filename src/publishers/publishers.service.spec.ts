import { Test, TestingModule } from '@nestjs/testing';
import { PublishersService } from './publishers.service';

describe('PublishersService', () => {
  let service: PublishersService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishersService],
    }).compile();
    service = module.get<PublishersService>(PublishersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
