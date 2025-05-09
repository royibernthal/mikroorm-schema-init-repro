import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';

import { Base } from '@/common';
import { UserRepository } from './user.repository';

@Entity({ repository: () => UserRepository })
export class User extends Base {
  [EntityRepositoryType]: UserRepository;

  @Property()
  email: string;

  @Property({ nullable: true })
  password?: string;

  @Property({ default: false })
  deleted = false;

  constructor({ email, password }: { email: string; password?: string }) {
    super();

    this.email = email;
    this.password = password;
  }
}
