import { Injectable } from "@nestjs/common";
import { ClassroomAggregateRoot } from "./classroom.aggregate";

@Injectable()
export class AggregateFactory {
	public getAggregateRoot(aggregateIdentifier: string): ClassroomAggregateRoot {
		return null;
	}
}
