import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PredictionDto } from './dto/prediction.dto';

@Injectable()
export class PredictionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: PredictionDto) {
    try {
      const fixture = await this.prisma.fixture.findUnique({
        where: { id: dto.fixtureId },
      });
      if (!fixture) {
        throw new NotFoundException('Fixture not found');
      }
      if (Date.now() > fixture.date.getTime()) {
        throw new ForbiddenException('Fixture has already started');
      }
      const prediction = await this.prisma.prediction.create({
        data: {
          userId,
          fixtureId: dto.fixtureId,
          result: dto.result,
        },
      });
      return prediction;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'You have already made a prediction for this fixture',
          );
        }
      }
      throw error;
    }
  }

  async update(userId: number, dto: PredictionDto) {
    try {
      const fixture = await this.prisma.fixture.findUnique({
        where: { id: dto.fixtureId },
      });
      if (!fixture) {
        throw new NotFoundException('Fixture not found');
      }
      if (Date.now() > fixture.date.getTime()) {
        throw new ForbiddenException('Fixture has already started');
      }
      const prediction = await this.prisma.prediction.update({
        where: {
          userFixtureId: {
            userId,
            fixtureId: dto.fixtureId,
          },
        },
        data: {
          result: dto.result,
        },
      });
      return prediction;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'You have already made a prediction for this fixture',
          );
        }
      }
      throw error;
    }
  }
}
