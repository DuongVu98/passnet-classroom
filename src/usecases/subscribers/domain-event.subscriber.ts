import { Injectable, Logger } from "@nestjs/common";
import { Observer } from "rxjs";
import { IDomainEvent } from "src/usecases/events/event.interface";

@Injectable()
export class DomainEventHandler implements Observer<IDomainEvent> {
	closed?: boolean;
	logger: Logger = new Logger();

	next(event: IDomainEvent): void {
		this.logger.log(`subscribe from event bus --> ${event}`);
		event.execute();
	}
	error: (err: any) => void;
	complete: () => void;
}
