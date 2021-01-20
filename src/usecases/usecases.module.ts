import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { CommandFactory } from "src/usecases/factories/command.factory";

@Module({
	imports: [DomainModule],
	providers: [
		CommandFactory,
	],
	exports: [ CommandFactory],
})
export class UsecasesModule {}
