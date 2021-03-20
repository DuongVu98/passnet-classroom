import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

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

	@GrpcMethod("EventConsumer", "ConsumePostNewJobEvent")
	consumePostNewJobEvent(event: PostNewJobEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));
		return { message: "success" };
	}

	@GrpcMethod("EventConsumer", "ConsumeAcceptStudentApplicationEvent")
	consumeAcceptStudentApplicationEvent(event: AcceptStudentApplicationEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));
		return { message: "success" };
	}

	@GrpcMethod("EventConsumer", "ConsumeRemoveStudentApplicationEvent")
	consumeRemoveStudentApplicationEvent(event: RemoveStudentApplicationEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));
		return { message: "success" };
	}

	@GrpcMethod("EventConsumer", "ConsumeDeleteJobEvent")
	consumeDeleteJobEvent(event: DeleteJobEvent): MainServiceResponse {
		this.logger.log(JSON.stringify(event));
		return { message: "success" };
	}
}
