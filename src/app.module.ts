import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PredictionModule } from './prediction/prediction.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FixtureModule } from './fixture/fixture.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PredictionModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FixtureModule,
  ],
})
export class AppModule {}
