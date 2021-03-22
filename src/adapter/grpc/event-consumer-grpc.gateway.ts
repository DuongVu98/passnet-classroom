import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Builder } from "builder-pattern";
import { AcceptStudentApplicationExternalEvent, RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { EventHandlerFacade } from "../facades/event-handler.facade";

interface MainServiceResponse {
	message: string;
}

interface PostNewJobEvent {
	ownerId: string;
	jobId: string;
}

interface AcceptStudentApplicationEvent {
	jobId: string;
	taId: string;
}

interface RemoveStudentApplicationEvent {
	jobId: string;
	taId: string;
}

interface DeleteJobEvent {
	jobId: string;
}

@Controller()
export class EventConsumerGrpcGateway {
	private logger = new Logger("GrpcEventConsumer");

	constructor(private eventHandlerFacade: EventHandlerFacade) {}

	@GrpcMethod("EventConsumer", "ConsumePostNewJobEvent")
	consumePostNewJobEvent(event: PostNewJobEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));
		return { message: "success" };
	}

	@GrpcMethod("EventConsumer", "ConsumeAcceptStudentApplicationEvent")
	consumeAcceptStudentApplicationEvent(event: AcceptStudentApplicationEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));

        const externalEvent = Builder(AcceptStudentApplicationExternalEvent).jobId(event.jobId).studentId(event.taId).build();
		this.eventHandlerFacade.apply(externalEvent);

		return { message: "success" };
	}

	@GrpcMethod("EventConsumer", "ConsumeRemoveStudentApplicationEvent")
	consumeRemoveStudentApplicationEvent(event: RemoveStudentApplicationEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));

        const externalEvent = Builder(RemoveStudentApplicationExternalEvent).jobId(event.jobId).studentId(event.taId).build();
		this.eventHandlerFacade.apply(externalEvent);

		return { message: "success" };
	}

	@GrpcMethod("EventConsumer", "ConsumeDeleteJobEvent")
	consumeDeleteJobEvent(event: DeleteJobEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));
		return { message: "success" };
	}
}
