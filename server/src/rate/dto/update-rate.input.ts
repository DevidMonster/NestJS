import { CreateRateInput } from './create-rate.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRateInput extends PartialType(CreateRateInput) {
  @Field(() => Int)
  id: number;
}
