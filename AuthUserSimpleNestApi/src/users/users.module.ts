import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "tokenxaxax123",
      // signOptions: { expiresIn: '180s' },
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}