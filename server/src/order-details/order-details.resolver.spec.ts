import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailsResolver } from './order-details.resolver';
import { OrderDetailsService } from './order-details.service';

describe('OrderDetailsResolver', () => {
  let resolver: OrderDetailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDetailsResolver, OrderDetailsService],
    }).compile();

    resolver = module.get<OrderDetailsResolver>(OrderDetailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
