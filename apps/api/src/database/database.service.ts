import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, Database } from '@ai-todos/database';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private _db: Database;
  
  constructor(private configService: ConfigService) {}
  
  onModuleInit() {
    const connectionString = this.configService.get<string>('DATABASE_URL');
    this._db = createClient(connectionString);
  }
  
  async onModuleDestroy() {
    // Clean up database connection if needed
  }
  
  get db(): Database {
    return this._db;
  }
}
