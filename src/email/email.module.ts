import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  // create nestjs micriservice's client
  providers: [
    {
      provide: 'EMAIL_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('EMAIL_SERVICE_HOST'),
            port: configService.get('EMAIL_SERVICE_PORT'),
          },
        }),
      inject: [ConfigService],
    },
  ],
})
export class EmailModule {}
