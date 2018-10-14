import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { BaseService } from '../shared/base.service';
import { User } from './user.model';
import { CreateUserDTO } from './create-user.dto';
import { Genres } from '../shared/genres';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User) private readonly _userModel: ModelType<User>) {
    super();
    this._model = this._userModel;
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    const { firstName, lastName, genres } = user;
    const newUser = new this._model(); // InstanceType<User>
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.genres = genres;

    return this.create(newUser);
  }

  async addGenres(userId: string, genres: Genres[]): Promise<User> {
    const user = await this.findById(userId);

    if (!user) {
      throw new HttpException(`No user found with ID [${userId}]`, HttpStatus.NOT_FOUND);
    }

    const userGenres = user.genres;
    genres.forEach(genreToAdd => {
      if (!this._genreExists(userGenres, genreToAdd)) {
        user.addGenre(genreToAdd);
      }
    });

    user.setUpdatedAtTimeToNow();

    try {
      return await user.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeGeneres(userId: string, genres: Genres[]): Promise<User> {
    try {
      const user = await this.findById(userId);
      const userGenres = user.genres;

      genres.forEach(genreToRemove => {
        if (this._genreExists(userGenres, genreToRemove)) {
          user.removeGenre(genreToRemove);
        }
      });

      user.setUpdatedAtTimeToNow();
      return user.save();
    } catch (e) {}
  }

  private _genreExists(userGenres: Genres[], genreToCheck: Genres): boolean {
    const genereExists = userGenres.some(userGenre => {
      return userGenre === genreToCheck;
    });

    return genereExists;
  }
}
