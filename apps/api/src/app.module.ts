import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    TodosModule,
  ],
})
export class AppModule {}
