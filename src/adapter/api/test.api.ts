import { Controller, Get, Inject, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import { DomainEventFactory, IDomainEvent } from "src/usecases/events/event.factory";
import { IEventBus } from "src/usecases/publishers/eventbus.publisher";
import { SomeService } from "src/usecases/some.service";

@Controller("test")
export class TestApi {
	constructor(
		private someService: SomeService,
		private domainEventFactory: DomainEventFactory,
		@Inject("domain-event-bus") private domainEventBus: IEventBus<IDomainEvent>
	) {}

	@Get()
	test(): void {
		this.someService.someExecute();
	}

	@UseInterceptors(LoggingInterceptor)
	@Get("test2")
	test2(): void {
		return null;
	}
}
