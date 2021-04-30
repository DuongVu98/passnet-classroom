import { ClassroomRepository } from "src/domain/repositories-sql/aggregate.repository";

export abstract class AbstractEventHandler<EVENT, RETURN> {
	event: EVENT;
	aggregateRepository: ClassroomRepository;

	public abstract handle(): Promise<RETURN>;

	public setEvent(event: EVENT): void {
		this.event = event;
	}
}
