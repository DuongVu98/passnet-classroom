import { ClassroomAggregateRepository } from "src/domain/repositories-sql/aggregate.repository";

export abstract class AbstractEventHandler<EVENT, RETURN> {
	event: EVENT;
	aggregateRepository: ClassroomAggregateRepository;

	public abstract handle(): Promise<RETURN>;

	public setEvent(event: EVENT): void {
		this.event = event;
	}
}
