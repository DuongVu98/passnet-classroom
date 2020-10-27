import { Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../../domain/aggregate/classroom.aggregate";
import { IDomainEvent } from "./event.factory";

export class ClassroomCreatedEvent implements IDomainEvent {
	logger: Logger = new Logger();

	constructor(private aggregate: ClassroomAggregateRoot, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.logger.log(`log from event --> ${this.aggregate} - ${this.aggregateRootIdentifier}`);
	}
}
