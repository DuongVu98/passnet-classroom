import { Injectable } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../../domain/aggregate/classroom.aggregate";
import { ClassroomCreatedEvent } from "./classroom-created.event";

export interface IDomainEvent {
	execute(): void;
}

@Injectable()
export class DomainEventFactory {
	public produceClassroomCreatedEvent(aggregate: ClassroomAggregateRoot, aggregateRootIdentifier: string): IDomainEvent {
		return new ClassroomCreatedEvent(aggregate, aggregateRootIdentifier);
	}
}
