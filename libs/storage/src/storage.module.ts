import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage.service';
import s3config from './config/storage.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [s3config],
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
