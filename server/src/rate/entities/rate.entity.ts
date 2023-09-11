import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Rate {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
