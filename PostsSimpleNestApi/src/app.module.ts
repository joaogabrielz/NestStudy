import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
