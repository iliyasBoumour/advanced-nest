import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// to validate our env variables
import * as Joi from '@hapi/joi';
import { ScheduleModule } from '@nestjs/schedule';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PropertiesModule } from './properties/properties.module';
import { EmailModule } from './email/email.module';
import { EmailScheduleModule } from './email-schedule/email-schedule.module';

@Module({
  imports: [
    PostsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
        // connect to redis
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    PropertiesModule,
    EmailModule,
    EmailScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
