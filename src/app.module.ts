import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BaseEntity, MySqlDriver } from '@mikro-orm/mysql';

import { UserModule } from '@/user';
import { loadConfig, databaseConfig } from '@/config';
import { DatabaseSchemaInitModule } from '@/database-schema-init';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [loadConfig] }), // must be first, as env vars are needed for configuring other modules
    MikroOrmModule.forRoot({
      ...databaseConfig(), // env is still no loaded at this point so can't use getEnv()
      driver: MySqlDriver,
      entities: [BaseEntity], // base entities need to be included in forRoot() as they don't have their own repositories
      autoLoadEntities: true,
      schemaGenerator: {
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        createForeignKeyConstraints: true, // whether to generate FK constraints
      },
    }),
    DatabaseSchemaInitModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
