import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRateInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
