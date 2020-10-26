import { Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";

export interface IDomainEvent {
	execute(): void;
}

export class ClassroomCreatedEvent implements IDomainEvent {
	logger: Logger = new Logger();

	constructor(private aggregate: ClassroomAggregateRoot, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.logger.log(`log from event --> ${this.aggregate} - ${this.aggregateRootIdentifier}`);
	}
}
