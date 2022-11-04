import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateFixtureDto, UpdateResultDto } from './dto';
import { FixtureService } from './fixture.service';

@Controller('fixtures')
export class FixtureController {
  constructor(private fixtureService: FixtureService) {}

  @Get('all')
  @UseGuards(JwtGuard)
  getAll() {
    return this.fixtureService.getAll();
  }

  @Post('create')
  @UseGuards(JwtGuard)
  create(@Body() dto: CreateFixtureDto, @GetUser() user: User) {
    return this.fixtureService.create(dto, user);
  }

  @Post('update')
  @UseGuards(JwtGuard)
  update(@Body() dto: UpdateResultDto, @GetUser() user: User) {
    return this.fixtureService.update(dto, user);
  }

  @Get('upcoming')
  @UseGuards(JwtGuard)
  getUpcoming() {
    return this.fixtureService.getUpcoming();
  }
}
