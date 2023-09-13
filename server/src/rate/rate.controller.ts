import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { IResponse } from 'src/types/response';
import { Rate } from './entities/rate.entity';
import { CreateRateInput } from './dto/create-rate.input';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { Role } from 'src/types/role.enum';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { AuthortizationGuard } from 'src/guard/authortization/authortization.guard';

@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get()
  async getRate(): Promise<IResponse<Rate[], undefined>> {
    const rates = await this.rateService.findAll();

    return { message: 'find rates success', data: rates };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Rate, undefined>> {
    const rate = await this.rateService.findOne(id);

    return { message: 'find rate success', data: rate };
  }

  @Get('/product/:id')
  async getByProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Rate[], undefined>> {
    const rates = await this.rateService.findByProduct(id);

    return { message: 'find rate success', data: rates };
  }

  @UseGuards(AuthenticationGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createRate(
    @Body() rqData: CreateRateInput,
  ): Promise<IResponse<Rate, undefined>> {
    const rate = await this.rateService.create(rqData);

    return { message: 'create rate success', data: rate };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Delete(':id')
  async deleteRate(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Rate, undefined>> {
    const rate = await this.rateService.remove(id);

    return { message: 'delete rate success', data: rate };
  }
}
