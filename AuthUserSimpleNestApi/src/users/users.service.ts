import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from './dtos/session.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signIn(userDto: UserDto): Promise<SessionDto> {
    const user = await this.usersRepository.findOneBy({
      email: userDto.email,
      password: userDto.password
    });

    if(!user) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email };
    return new SessionDto(await this.jwtService.signAsync(payload));
  }

  signUp(userDto: UserDto): Promise<User> {
    let user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.phone = userDto.phone;
    user.bio = userDto.bio;
    user.password = userDto.password;

    return this.usersRepository.save(user);
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    let user = await this.usersRepository.findOneBy({id: id});
    user.name = userDto.name;
    user.email = userDto.email;
    user.phone = userDto.phone;
    user.bio = userDto.bio;
    user.password = userDto.password;

    return this.usersRepository.save(user);
  }

  show(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id: id});
  }
}
