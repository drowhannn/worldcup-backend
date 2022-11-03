import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeletePredictionDto, PredictionDto } from './dto/prediction.dto';

@Injectable()
export class PredictionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: PredictionDto) {
    try {
      await this.checkIfFixtureHasStarted(dto.fixtureId);
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
      await this.checkIfFixtureHasStarted(dto.fixtureId);
      return await this.prisma.prediction.update({
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

  async delete(userId: number, dto: DeletePredictionDto) {
    await this.checkIfFixtureHasStarted(dto.fixtureId);
    try {
      await this.prisma.prediction.delete({
        where: {
          userFixtureId: {
            userId,
            fixtureId: dto.fixtureId,
          },
        },
      });
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async checkIfFixtureHasStarted(fixtureId: number) {
    const fixture = await this.prisma.fixture.findUnique({
      where: { id: fixtureId },
    });
    if (!fixture) {
      throw new NotFoundException('Fixture not found');
    }
    if (Date.now() > fixture.date.getTime()) {
      throw new ForbiddenException('Fixture has already started');
    }
  }
}
