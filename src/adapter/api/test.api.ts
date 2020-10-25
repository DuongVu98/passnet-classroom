import { Controller, Get, Inject, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/config/interceptors/logging.interceptor";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { DomainEventFactory } from "src/domain/events/event.factory";
import { ClassroomCreatedEvent, DomainEvent } from "src/domain/events/event.interface";
import { IEventBus } from "src/usecases/publishers/eventbus.publisher";
import { SomeService } from "src/usecases/some.service";

@Controller("test")
export class TestApi {
	constructor(
        private someService: SomeService,
        private domainEventFactory: DomainEventFactory,
		@Inject("domain-event-bus") private domainEventBus: IEventBus<DomainEvent>
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

	@Get("test3")
	test3(): void {
		this.domainEventBus.publish(this.domainEventFactory.produceClassroomCreatedEvent(new ClassroomAggregateRoot()));
	}
}
