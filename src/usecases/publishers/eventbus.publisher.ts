import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { IDomainEvent } from "src/usecases/events/event.interface";
import { DomainEventHandler } from "../subscribers/domain-event.subscriber";

export interface IEventBus<EVENT> {
	publish(t: EVENT): void;
}

@Injectable()
export class DomainEventBus implements IEventBus<IDomainEvent> {
	eventEmitter: Subject<IDomainEvent> = new Subject<IDomainEvent>();

	constructor(private domainEventHandler: DomainEventHandler) {
		this.eventEmitter.subscribe(domainEventHandler);
	}

	publish(event: IDomainEvent): void {
		this.eventEmitter.next(event);
	}
}
