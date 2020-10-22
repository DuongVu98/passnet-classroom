import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./domain/domain.module";
import { UsecasesModule } from "./usecases/usecases.module";
import { AdapterModule } from "./adapter/adapter.module";
import { ConfigModule } from "./config/config.module";

@Module({
	imports: [DomainModule, UsecasesModule, AdapterModule, ConfigModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
