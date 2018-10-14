import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserDTO } from './create-user.dto';
import { Genres } from '../shared/genres';

@Controller('users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[] | null> {
    return this._userService.findAll();
  }

  @Post()
  async createUser(@Body() userDto: CreateUserDTO): Promise<User> {
    return this._userService.createUser(userDto);
  }

  @Post('/add-genres')
  async addGenres(@Body() addGenresDto: { id: string; genres: Genres[] }): Promise<User> {
    return this._userService.addGenres(addGenresDto.id, addGenresDto.genres);
  }

  @Post('/remove-genres')
  async removeGeneres(@Body() removeGenresDto: { id: string; genres: Genres[] }): Promise<User> {
    return this._userService.removeGeneres(removeGenresDto.id, removeGenresDto.genres);
  }
}
