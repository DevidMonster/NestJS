import { Injectable } from '@nestjs/common';
import { CreateRateInput } from './dto/create-rate.input';
import { UpdateRateInput } from './dto/update-rate.input';

@Injectable()
export class RateService {
  create(createRateInput: CreateRateInput) {
    return 'This action adds a new rate';
  }

  findAll() {
    return `This action returns all rate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  update(id: number, updateRateInput: UpdateRateInput) {
    return `This action updates a #${id} rate`;
  }

  remove(id: number) {
    return `This action removes a #${id} rate`;
  }
}
