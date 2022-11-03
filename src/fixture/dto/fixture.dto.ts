import { FixtureCategory, FixtureResult, Team } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateFixtureDto {
  @IsEnum(Team)
  @IsNotEmpty()
  teamA: Team;

  @IsEnum(Team)
  @IsNotEmpty()
  teamB: Team;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @IsEnum(FixtureCategory)
  @IsNotEmpty()
  category: FixtureCategory;

  @IsEnum(FixtureResult)
  @IsOptional()
  result?: FixtureResult;

  @IsNumber()
  @IsOptional()
  scoreA?: number;

  @IsNumber()
  @IsOptional()
  scoreB?: number;

  @IsNumber()
  @IsOptional()
  penaltyA?: number;

  @IsNumber()
  @IsOptional()
  penaltyB?: number;
}

export class UpdateResultDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEnum(Team)
  @IsNotEmpty()
  @IsOptional()
  teamA: Team;

  @IsEnum(Team)
  @IsOptional()
  @IsNotEmpty()
  teamB: Team;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @IsNotEmpty()
  date: Date;

  @IsEnum(FixtureCategory)
  @IsNotEmpty()
  @IsOptional()
  category: FixtureCategory;

  @IsEnum(FixtureResult)
  @IsOptional()
  result: FixtureResult;

  @IsNumber()
  @IsOptional()
  scoreA: number;

  @IsNumber()
  @IsOptional()
  scoreB: number;

  @IsNumber()
  @IsOptional()
  penaltyA?: number;

  @IsNumber()
  @IsOptional()
  penaltyB?: number;
}
