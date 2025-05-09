import { Entity, EntityRepositoryType, Enum, Property } from '@mikro-orm/core';

import { Base } from '@/common';
import { UserType } from '../enums';
import { UserRepository } from './user.repository';

@Entity({ repository: () => UserRepository })
export class User extends Base {
  [EntityRepositoryType]: UserRepository;

  @Property()
  email: string;

  @Property({ default: false })
  emailConfirmed = false;

  @Property({ nullable: true })
  password?: string;

  @Property({ default: false })
  deleted = false;

  @Enum(() => UserType)
  type = UserType.Normal;

  constructor({ email, password }: { email: string; password?: string }) {
    super();

    this.email = email;
    this.password = password;
  }
}
