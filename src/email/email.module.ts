import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  // create nestjs micriservice's client
  providers: [
    {
      provide: 'EMAIL_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'emails',
            protoPath: join(__dirname, 'emails.proto'),
            // this gRPC server can be accessed by the provided URL.
            url: configService.get('GRPC_CONNECTION_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class EmailModule {}
