import { Genres } from 'shared/genres';

export class CreateUserDTO {
  readonly firstName: string;
  readonly lastName: string;
  readonly genres: Genres[];
}
