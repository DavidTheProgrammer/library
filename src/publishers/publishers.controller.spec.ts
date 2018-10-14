import { Test, TestingModule } from '@nestjs/testing';
import { PublishersController } from './publishers.controller';

describe('Publishers Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PublishersController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PublishersController = module.get<PublishersController>(PublishersController);
    expect(controller).toBeDefined();
  });
});
