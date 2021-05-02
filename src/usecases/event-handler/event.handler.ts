import { Event } from "src/domain/events/events";

export interface EventHandler {
	handle(event: Event): Promise<any>;
}
