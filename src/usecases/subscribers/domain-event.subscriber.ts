import { Injectable, Logger } from "@nestjs/common";
import { Observer } from "rxjs";
import { DomainEvent } from "src/domain/events/event.interface";

@Injectable()
export class DomainEventHandler implements Observer<DomainEvent> {
	closed?: boolean;
	logger: Logger = new Logger();

	next(event: DomainEvent): void {
		this.logger.log(`subscribe from event bus --> ${event}`);
		event.execute();
	}
	error: (err: any) => void;
	complete: () => void;
}
