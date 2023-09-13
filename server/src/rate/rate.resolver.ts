import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RateService } from './rate.service';
import { Rate } from './entities/rate.entity';
import { CreateRateInput } from './dto/create-rate.input';

@Resolver(() => Rate)
export class RateResolver {
  constructor(private readonly rateService: RateService) {}

  @Mutation(() => Rate)
  createRate(@Args('createRateInput') createRateInput: CreateRateInput) {
    return this.rateService.create(createRateInput);
  }

  @Query(() => [Rate], { name: 'rate' })
  findAll() {
    return this.rateService.findAll();
  }

  @Query(() => [Rate], { name: 'rate' })
  findByProductId(@Args('id', { type: () => Int }) id: number) {
    return this.rateService.findByProduct(id);
  }

  @Query(() => Rate, { name: 'rate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rateService.findOne(id);
  }

  @Mutation(() => Rate)
  removeRate(@Args('id', { type: () => Int }) id: number) {
    return this.rateService.remove(id);
  }
}
