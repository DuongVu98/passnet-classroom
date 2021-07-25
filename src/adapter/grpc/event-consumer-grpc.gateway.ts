import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Builder } from "builder-pattern";
import { Job } from "src/domain/aggregate/vos/value-objects";
import { AddAssistantCommand, RemoveAssistantCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandFactory } from "src/usecases/factories/command.factory";

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

	constructor(private classroomRepository: ClassroomAggregateRepository, private commandExecutorProvider: CommandFactory) {}

	@GrpcMethod("EventConsumer", "ConsumeAcceptStudentApplicationEvent")
	consumeAcceptStudentApplicationEvent(event: AcceptStudentApplicationEvent): Promise<ServiceResponse> {
		return this.classroomRepository
			.findByJobId(new Job(event.jobId))
			.then(async (classroom) => {
				this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

				if (classroom != null) {
					let command = Builder(AddAssistantCommand).aggregateId(classroom.jobId.value).taId(event.taId).build();
					let commandExecutor = this.commandExecutorProvider.produce(command);

					return commandExecutor.execute(command);
				}
			})
			.then(() => {
				this.logger.log("return success");
				return { message: "SUCCESS" };
			})
			.catch((error) => {
				this.logger.error(`throw error: ${error}`);
				return { message: "FAILURE" };
			});
	}

	@GrpcMethod("EventConsumer", "ConsumeRemoveStudentApplicationEvent")
	consumeRemoveStudentApplicationEvent(event: RemoveStudentApplicationEvent): Promise<ServiceResponse> {
		return this.classroomRepository
			.findByJobId(new Job(event.jobId))
			.then(async (classroom) => {
				this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

				if (classroom != null) {
					let command = Builder(RemoveAssistantCommand).aggregateId(classroom.jobId.value).taId(event.taId).build();
					let commandExecutor = this.commandExecutorProvider.produce(command);

					return commandExecutor.execute(command);
				}
			})
			.then(() => {
				this.logger.log("return success");
				return { message: "SUCCESS" };
			})
			.catch((error) => {
				this.logger.error(`throw error: ${error}`);
				return { message: "FAILURE" };
			});
	}
}
