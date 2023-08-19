import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Param, Request } from '@nestjs/common/decorators/http';
import { SessionDto } from './dtos/session.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { SessionGuard } from './session.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @UseGuards(SessionGuard)
  @Get(':id')
  show(@Param('id') id: number, @Request() req): Promise<User> {
    return this.userService.show(id);
  }

  @UseGuards(SessionGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUser: UserDto): Promise<User> {
    return this.userService.update(id, updateUser);
  }

  @Post('sign-up')
  create(@Body() createUser: UserDto): Promise<User> {
    return this.userService.signUp(createUser);
  }

  @Post('sign-in')
  login(@Body() signInUser: UserDto): Promise<SessionDto> {
    return this.userService.signIn(signInUser);
  }

}
