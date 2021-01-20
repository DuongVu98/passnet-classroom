import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { DomainEventFactory } from "./events/event.factory";
import { DomainEventBus } from "./publishers/eventbus.publisher";
import { QueryFactory } from "./queries/query.factory";
import { SomeService } from "./some.service";
import { DomainEventHandler } from "./subscribers/domain-event.subscriber";
import { CommandFactory } from "src/usecases/factories/command.factory";

@Module({
	imports: [DomainModule],
	providers: [
		SomeService,
		CommandFactory,
		DomainEventHandler,
		DomainEventFactory,
		QueryFactory,
		{
			provide: "domain-event-bus",
			useClass: DomainEventBus,
		},
	],
	exports: [SomeService, CommandFactory, QueryFactory, DomainEventFactory, "domain-event-bus"],
})
export class UsecasesModule {}
