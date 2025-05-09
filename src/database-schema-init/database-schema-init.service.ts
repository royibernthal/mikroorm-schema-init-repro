import { Injectable, Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/mysql';

import { getEnv } from '@/config';
import { DatabaseSchemaInitOptions } from './database-schema-init-options.interface';

@Injectable()
export class DatabaseSchemaInitService {
  private readonly logger = new Logger(DatabaseSchemaInitService.name);

  constructor(private readonly orm: MikroORM) {}

  async initialize(): Promise<void> {
    try {
      this.logger.log('Starting database initialization...');

      // const dropSchemaSQL = await this.orm.schema.getDropSchemaSQL();
      const createSchemaSQL = await this.orm.schema.getCreateSchemaSQL();
      // const updateSchemaSQL = await this.orm.schema.getUpdateSchemaSQL();

      // this.logger.log(dropSchemaSQL);
      this.logger.log(createSchemaSQL);
      // this.logger.log(updateSchemaSQL);

      // await this.orm.schema.dropSchema();
      await this.orm.schema.createSchema();
      await this.orm.schema.updateSchema();

      this.logger.log('Database initialization completed successfully');
    } catch (error) {
      this.logger.error('Failed to initialize database', error);
    }
  }
}
