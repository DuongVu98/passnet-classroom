import { Logger } from "@nestjs/common";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { ClassroomViewBuilder } from "src/domain/views/classroom.view";
import { ClassroomAggregateRoot } from "../../domain/aggregate/classroom.aggregate";
import { IDomainEvent } from "./event.factory";

export class ClassroomCreatedEvent implements IDomainEvent {
	logger: Logger = new Logger();

    private classroomViewRepository: ClassroomViewRepository;

	constructor(private aggregate: ClassroomAggregateRoot, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.logger.log(`log from event --> ${this.aggregate} - ${this.aggregateRootIdentifier}`);

		
	}
}
