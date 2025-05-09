import { FindOneOptions, Loaded } from '@mikro-orm/core';

import { BaseRepository } from '@/common';
import { User } from './user.entity';

export class UserRepository extends BaseRepository<User> {
  async findByEmail<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    email?: string,
    options?: FindOneOptions<User, Hint, Fields, Excludes>,
  ): Promise<Loaded<User, Hint, Fields, Excludes> | null> {
    if (!email) return Promise.resolve(null);

    return this.findOne<Hint, Fields, Excludes>({ email }, options);
  }
}
