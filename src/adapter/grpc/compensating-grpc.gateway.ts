import { Controller, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

interface EventId {
	eventId: string;
}

@Controller()
export class CompensatingGrpcGateway {
	private logger = new Logger("CompensatingGrpcGateway");

	@GrpcMethod("CompensatingExecutor", "Rollback")
	rollbackTransactionForEvent(event: EventId) {
		this.logger.log(`receive request for compensating with eventId [${event.eventId}]`);
	}
}
