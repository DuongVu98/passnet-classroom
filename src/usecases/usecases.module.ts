import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { CommandFactory } from "./factories/command.factory";
import { ViewProjector } from "./queries/view.projector";

@Module({
	imports: [DomainModule],
	providers: [CommandFactory, ViewProjector],
	exports: [CommandFactory, ViewProjector],
})
export class UsecasesModule {}
