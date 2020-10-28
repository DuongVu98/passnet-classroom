import { Injectable, Logger } from "@nestjs/common";
import { Observer } from "rxjs";
import { IDomainEvent } from "../events/event.factory";

@Injectable()
export class DomainEventHandler implements Observer<IDomainEvent> {
	closed?: boolean;
	logger: Logger = new Logger();

	next(event: IDomainEvent): void {
		event.execute();
	}
	error: (err: any) => void;
	complete: () => void;
}
