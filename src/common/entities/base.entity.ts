import { randomUUID } from 'crypto';
import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class Base {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID(); // string type on purpose for softer type checking

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
