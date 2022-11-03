import { FixtureResult } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class PredictionDto {
  @IsNumber()
  @IsNotEmpty()
  fixtureId: number;

  @IsEnum(FixtureResult)
  @IsNotEmpty()
  result: FixtureResult;
}

export class DeletePredictionDto {
  @IsNumber()
  @IsNotEmpty()
  fixtureId: number;
}
