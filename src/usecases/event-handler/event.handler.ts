import e from "express";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";

export abstract class AbstractEventHandler<EVENT, RETURN> {
    event: EVENT;
    aggregateRepository: ClassroomAggregateRootRepository;

    public abstract handle(): Promise<RETURN>;

    public setEvent(event: EVENT): void {
        this.event = event;
    }
}