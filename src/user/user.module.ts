import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [],
  exports: [MikroOrmModule.forFeature([User])],
})
export class UserModule {}
