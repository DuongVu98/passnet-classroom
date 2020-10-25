import { Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";

export interface DomainEvent {
	execute(): void;
}

export class ClassroomCreatedEvent implements DomainEvent {

	logger: Logger = new Logger();

    constructor(private aggregate: ClassroomAggregateRoot){}

	execute(): void {
		this.logger.log(this.aggregate);
	}
}
