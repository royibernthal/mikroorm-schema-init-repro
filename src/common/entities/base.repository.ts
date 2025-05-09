import {
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FindOneOrFailOptions,
  Loaded,
} from '@mikro-orm/core';
import { BadRequestException } from '@nestjs/common';

import { Base } from './base.entity';

export abstract class BaseRepository<
  T extends Base,
> extends EntityRepository<T> {
  findById<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    id: string,
    options?: FindOneOptions<T, Hint, Fields, Excludes>,
  ): Promise<Loaded<T, Hint, Fields, Excludes> | null> {
    return this.findOne<Hint, Fields, Excludes>(
      { id } as FilterQuery<T>,
      options,
    );
  }

  async findByIdOrFail<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    id: string,
    options?: FindOneOrFailOptions<T, Hint, Fields, Excludes>,
  ): Promise<Loaded<T, Hint, Fields, Excludes>> {
    const result = await this.findById<Hint, Fields, Excludes>(id, options);

    if (!result) {
      throw new BadRequestException(this.getNotFoundMessage());
    }

    return result;
  }

  protected getNotFoundMessage() {
    return `${(this.entityName as any).toString()} not found`;
  }
}
