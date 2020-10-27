import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { CommandFactory } from "./commands/command.factory";
import { DomainEventFactory } from "./events/event.factory";
import { DomainEventBus } from "./publishers/eventbus.publisher";
import { SomeService } from "./some.service";
import { DomainEventHandler } from "./subscribers/domain-event.subscriber";

@Module({
	imports: [DomainModule],
	providers: [
		SomeService,
		DomainEventHandler,
		DomainEventFactory,
		CommandFactory,
		{
			provide: "domain-event-bus",
			useClass: DomainEventBus,
		},
	],
	exports: [SomeService, CommandFactory, DomainEventFactory, "domain-event-bus"],
})
export class UsecasesModule {}
