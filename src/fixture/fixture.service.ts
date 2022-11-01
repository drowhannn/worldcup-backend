import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFixtureDto } from './dto';

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
}
