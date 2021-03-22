import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { CommandFactory } from "./factories/command.factory";
import { ViewProjector } from "./queries/view.projector";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { EventHandlerFactory } from "./factories/event-handler.factory";

@Module({
	imports: [DomainModule],
	providers: [CommandFactory, ViewProjector, UuidGenerateService, EventHandlerFactory],
	exports: [CommandFactory, ViewProjector, UuidGenerateService, EventHandlerFactory],
})
export class UsecasesModule {}
