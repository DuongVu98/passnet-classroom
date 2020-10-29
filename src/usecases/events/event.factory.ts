import { Inject, Injectable } from "@nestjs/common";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { ClassroomAggregateRoot } from "../../domain/aggregate/classroom.aggregate";
import { ClassroomCreatedEvent } from "./classroom-created.event";
import { StudentAddedEvent } from "./student-added.event";

export interface IDomainEvent {
	execute(): void;
}

@Injectable()
export class DomainEventFactory {
	constructor(
		private viewRepository: ClassroomViewRepository,
		@Inject("user-aggregate-mapper") private userAggregateMapper: IAggregateMapper<UserAggregate>
	) {}

	public produceClassroomCreatedEvent(aggregate: ClassroomAggregateRoot, aggregateRootIdentifier: string): IDomainEvent {
		return new ClassroomCreatedEvent(aggregate, aggregateRootIdentifier)
			.withViewRepository(this.viewRepository)
			.withUserAggregateMapper(this.userAggregateMapper);
	}

	public produceStudentAddedEvent(aggregate: UserAggregate, aggregateRootIdentifier: string): IDomainEvent {
		return new StudentAddedEvent(aggregate, aggregateRootIdentifier).withClassroomViewRepository(this.viewRepository);
	}
}
