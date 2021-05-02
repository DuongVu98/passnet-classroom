import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { AcceptStudentApplicationExternalEvent, Event, RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { AcceptStudentApplicationEventHandler } from "../event-handler/accept-student-application.handler";
import { EventHandler } from "../event-handler/event.handler";
import { RemoveStudentApplicationEventHandler } from "../event-handler/remove-student-application.handler";

@Injectable()
export class EventHandlerFactory {
	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	produce(event: Event): EventHandler {
		if (event instanceof AcceptStudentApplicationExternalEvent) {
			return this.produceAcceptStudentApplicationEventHandler(event);
		} else if (event instanceof RemoveStudentApplicationExternalEvent) {
			return this.produceRemovetudentApplicationEventHandler(event);
		} else {
			return null;
		}
	}

	private produceAcceptStudentApplicationEventHandler(event: AcceptStudentApplicationExternalEvent): EventHandler {
		return new AcceptStudentApplicationEventHandler(this.classroomRepository);
	}

	private produceRemovetudentApplicationEventHandler(event: RemoveStudentApplicationExternalEvent): EventHandler {
		return new RemoveStudentApplicationEventHandler(this.classroomRepository);
	}
}
