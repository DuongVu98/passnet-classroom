import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { CommandFactory } from "./factories/command.factory";
import { ViewProjector } from "./queries/view.projector";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { EventHandlerFactory } from "./factories/event-handler.factory";
import { Projector } from "./queries-sql/projector";

@Module({
	imports: [DomainModule],
	providers: [CommandFactory, Projector, ViewProjector, UuidGenerateService, EventHandlerFactory],
	exports: [CommandFactory, Projector, ViewProjector, UuidGenerateService, EventHandlerFactory],
})
export class UsecasesModule {}
