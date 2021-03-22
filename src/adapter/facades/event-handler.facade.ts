import { Injectable, Logger } from "@nestjs/common";
import { AcceptStudentApplicationExternalEvent, RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { EventHandlerFactory } from "src/usecases/factories/event-handler.factory";

@Injectable()
export class EventHandlerFacade {
	logger: Logger = new Logger("EventHandlerFacde");

	constructor(private eventHandlerFactory: EventHandlerFactory) {}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public apply(event: any): Promise<void> {
		if (event instanceof AcceptStudentApplicationExternalEvent) {
			return this.applyAcceptStudentApplicationEvent(event);
		} else if (event instanceof RemoveStudentApplicationExternalEvent) {
			return this.applyRemoveStudentApplicationEvent(event);
		} else {
			this.logger.log(`No matched event type`);
		}
	}

	private applyAcceptStudentApplicationEvent(event: AcceptStudentApplicationExternalEvent): Promise<void> {
		const eventHandler = this.eventHandlerFactory.produceAcceptStudentApplicationEventHandler(event);

		return eventHandler.handle();
	}

	private applyRemoveStudentApplicationEvent(event: RemoveStudentApplicationExternalEvent): Promise<void> {
		const eventHandler = this.eventHandlerFactory.produceRemovetudentApplicationEventHandler(event);

		return eventHandler.handle();
	}
}
