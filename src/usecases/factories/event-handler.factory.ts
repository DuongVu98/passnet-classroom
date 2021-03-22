import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { AcceptStudentApplicationExternalEvent, RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { AcceptStudentApplicationEventHandler } from "../event-handler/accept-student-application.handler";
import { AbstractEventHandler } from "../event-handler/event.handler";
import { RemoveStudentApplicationEventHandler } from "../event-handler/remove-student-application.handler";

@Injectable()
export class EventHandlerFactory {
	constructor(private aggregateRepository: ClassroomAggregateRootRepository) {}

	produceAcceptStudentApplicationEventHandler(
		event: AcceptStudentApplicationExternalEvent
	): AbstractEventHandler<AcceptStudentApplicationExternalEvent, void> {
		return Builder(AcceptStudentApplicationEventHandler).aggregateRepository(this.aggregateRepository).event(event).build();
	}

	produceRemovetudentApplicationEventHandler(
		event: RemoveStudentApplicationExternalEvent
	): AbstractEventHandler<RemoveStudentApplicationExternalEvent, void> {
		return Builder(RemoveStudentApplicationEventHandler).aggregateRepository(this.aggregateRepository).event(event).build();
	}
}
