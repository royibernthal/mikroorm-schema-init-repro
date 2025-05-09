import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from './entities';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService, MikroOrmModule.forFeature([User])],
})
export class UserModule {}
