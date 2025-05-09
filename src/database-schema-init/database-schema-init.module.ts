import { Module, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/mysql';

import { DatabaseSchemaInitService } from './database-schema-init.service';

@Module({})
export class DatabaseSchemaInitModule implements OnModuleInit {
  constructor(
    private readonly databaseSchemaInitService: DatabaseSchemaInitService,
  ) {}

  static forRoot() {
    return {
      module: DatabaseSchemaInitModule,
      providers: [
        {
          provide: DatabaseSchemaInitService,
          useFactory: (orm: MikroORM) => new DatabaseSchemaInitService(orm),
          inject: [MikroORM],
        },
      ],
    };
  }

  async onModuleInit(): Promise<void> {
    await this.databaseSchemaInitService.initialize();
  }
}
