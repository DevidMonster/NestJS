import { Test, TestingModule } from '@nestjs/testing';
import { RateResolver } from './rate.resolver';
import { RateService } from './rate.service';

describe('RateResolver', () => {
  let resolver: RateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateResolver, RateService],
    }).compile();

    resolver = module.get<RateResolver>(RateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
