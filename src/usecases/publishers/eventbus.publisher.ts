import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { DomainEvent } from "src/domain/events/event.interface";
import { DomainEventHandler } from "../subscribers/domain-event.subscriber";

export interface IEventBus<EVENT> {
	publish(t: EVENT): void;
}

@Injectable()
export class DomainEventBus implements IEventBus<DomainEvent> {
	eventEmitter: Subject<DomainEvent> = new Subject<DomainEvent>();

	constructor(private domainEventHandler: DomainEventHandler) {
		this.eventEmitter.subscribe(domainEventHandler);
	}

	publish(event: DomainEvent): void {
		this.eventEmitter.next(event);
	}
}
