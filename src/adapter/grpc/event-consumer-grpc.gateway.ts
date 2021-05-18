import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Builder } from "builder-pattern";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { Job, UserId } from "src/domain/aggregate/vos/value-objects";
import { AddTeacherAssistanceCommand, RemoveTeacherAssistanceCommand } from "src/domain/commands/commands";
import { AcceptStudentApplicationExternalEvent, RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandFactory } from "src/usecases/factories/command.factory";
import { EventHandlerFacade } from "../facades/event-handler.facade";

interface ServiceResponse {
	message: string;
}

interface AcceptStudentApplicationEvent {
	jobId: string;
	taId: string;
	eventId: string;
}

interface RemoveStudentApplicationEvent {
	jobId: string;
	taId: string;
	eventId: string;
}

@Controller()
export class EventConsumerGrpcGateway {
	private logger = new Logger("GrpcEventConsumer");

	constructor(
		private eventHandlerFacade: EventHandlerFacade,
		private classroomRepository: ClassroomAggregateRepository,
		private commandExecutorProvider: CommandFactory
	) {}

	@GrpcMethod("EventConsumer", "ConsumeAcceptStudentApplicationEvent")
	consumeAcceptStudentApplicationEvent(event: AcceptStudentApplicationEvent): Promise<ServiceResponse> {
		// this.logger.log(JSON.stringify(event));

		// const externalEvent = Builder(AcceptStudentApplicationExternalEvent).jobId(event.jobId).studentId(event.taId).build();
		// this.eventHandlerFacade.apply(externalEvent);

		// return { message: "success" };

		return this.classroomRepository
			.findByJobId(new Job(event.jobId))
			.then(async (classroom) => {
				this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

				if (classroom != null) {
					let command = Builder(AddTeacherAssistanceCommand).aggregateId(classroom.jobId.value).taId(event.taId).build();
					let commandExecutor = this.commandExecutorProvider.produce(command);

					return commandExecutor.execute(command);
				}
			})
			.then(() => {
				return { message: "success" };
			})
			.catch((error) => {
				return { message: "failure" };
			});
	}

	@GrpcMethod("EventConsumer", "ConsumeRemoveStudentApplicationEvent")
	consumeRemoveStudentApplicationEvent(event: RemoveStudentApplicationEvent): Promise<ServiceResponse> {
		// this.logger.log(JSON.stringify(event));

		// const externalEvent = Builder(RemoveStudentApplicationExternalEvent).jobId(event.jobId).studentId(event.taId).build();
		// this.eventHandlerFacade.apply(externalEvent);

		// return { message: "success" };

		return this.classroomRepository
			.findByJobId(new Job(event.jobId))
			.then(async (classroom) => {
				this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

				if (classroom != null) {
					let command = Builder(RemoveTeacherAssistanceCommand).aggregateId(classroom.jobId.value).taId(event.taId).build();
					let commandExecutor = this.commandExecutorProvider.produce(command);

					return commandExecutor.execute(command);
				}
			})
			.then(() => {
				return { message: "success" };
			})
			.catch((error) => {
				return { message: "failure" };
			});
	}
}
