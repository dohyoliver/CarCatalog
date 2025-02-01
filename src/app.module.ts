import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarcatalogModule } from './carcatalog/carcatalog.module';

@Module({
  imports: [CarcatalogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
