import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { DomainEventBus } from "./publishers/eventbus.publisher";
import { SomeService } from "./some.service";
import { DomainEventHandler } from "./subscribers/domain-event.subscriber";

@Module({
	imports: [DomainModule],
	providers: [
        SomeService,
        DomainEventHandler,
		{
			provide: "domain-event-bus",
			useClass: DomainEventBus,
		},
	],
	exports: [SomeService, "domain-event-bus"],
})
export class UsecasesModule {}
