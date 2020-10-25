import { Injectable } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";
import { ClassroomCreatedEvent, IDomainEvent } from "./event.interface";

@Injectable()
export class DomainEventFactory {
	public produceClassroomCreatedEvent(aggregate: ClassroomAggregateRoot): IDomainEvent {
		return new ClassroomCreatedEvent(aggregate);
	}
}
