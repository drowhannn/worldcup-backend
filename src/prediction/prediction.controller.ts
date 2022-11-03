import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PredictionDto } from './dto/prediction.dto';
import { PredictionService } from './prediction.service';

@Controller('predictions')
export class PredictionController {
  constructor(private predictionService: PredictionService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  create(@Body() dto: PredictionDto, @GetUser() user: User) {
    return this.predictionService.create(user.id, dto);
  }

  @Patch('update')
  @UseGuards(JwtGuard)
  update(@Body() dto: PredictionDto, @GetUser() user: User) {
    return this.predictionService.update(user.id, dto);
  }
}
