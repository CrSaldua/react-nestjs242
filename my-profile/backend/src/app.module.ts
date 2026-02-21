import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestbookController } from './guestbook.controller';
import { GuestbookService } from './guestbook.service';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [GuestbookController],
  providers: [GuestbookService],
})
export class AppModule { }
