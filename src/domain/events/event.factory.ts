import { Injectable } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";
import { ClassroomCreatedEvent, DomainEvent } from "./event.interface";

@Injectable()
export class DomainEventFactory {
	public produceClassroomCreatedEvent(aggregate: ClassroomAggregateRoot): DomainEvent {
		return new ClassroomCreatedEvent(aggregate);
	}
}
