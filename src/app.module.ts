import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./domain/domain.module";
import { UsecasesModule } from "./usecases/usecases.module";
import { AdapterModule } from "./adapter/adapter.module";
import { AppConfigModule } from "./config/config.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forRoot(process.env.DATABASE_URL),
		DomainModule,
		UsecasesModule,
		AdapterModule,
		AppConfigModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
