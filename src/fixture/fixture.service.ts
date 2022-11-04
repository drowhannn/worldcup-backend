import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFixtureDto, UpdateResultDto } from './dto';

@Injectable()
export class FixtureService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.fixture.findMany();
  }

  create(dto: CreateFixtureDto, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException('You are not allowed to create a fixture');
    }
    console.log(dto);
    try {
      return this.prisma.fixture.create({
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  update(dto: UpdateResultDto, user: User) {
    if (!user.isAdmin) {
      throw new ForbiddenException('You are not allowed to update a fixture');
    }
    try {
      return this.prisma.fixture.update({
        where: {
          id: dto.id,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUpcoming() {
    const fixtures = await this.prisma.fixture.findMany({
      where: {
        date: {
          gt: new Date(),
        },
      },
    });
    console.log(fixtures);
    return 'h';
  }

  async getLive() {
    const fixtures = await this.prisma.fixture.findMany({
      where: {
        result: null,
        date: {
          lt: new Date(),
        },
      },
    });
    return fixtures;
  }

  async getFinished() {
    const fixtures = await this.prisma.fixture.findMany({
      where: {
        result: {
          not: null,
        },
      },
    });
    return fixtures;
  }
}
