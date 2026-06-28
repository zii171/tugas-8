import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        retryWrites: true,
        w: 'majority',
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('Berhasil terhubung ke MongoDB Atlas');
          });
          connection.on('error', (err: any) => {
            console.error('Gagal terhubung ke MongoDB Atlas:', err.message);
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    ProductsModule,
  ],
})
export class AppModule {}
