import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { userInfo } from 'os';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { DeletePredictionDto, PredictionDto } from './dto/prediction.dto';
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

  @Delete('delete')
  @UseGuards(JwtGuard)
  delete(@Body() dto: DeletePredictionDto, @GetUser() user: User) {
    return this.predictionService.delete(user.id, dto);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  getFixturePredictionDetails(
    @GetUser() user: User,
    @Param('id') fixtureId: string,
  ) {
    return this.predictionService.getFixurePredictionDetails(
      user.id,
      parseInt(fixtureId),
    );
  }
}
