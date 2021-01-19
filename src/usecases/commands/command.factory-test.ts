import { ClassroomAggregateRoot } from "src/domain/aggregate-test/classroom.root";

export abstract class AbstractCommand {
    abstract execute(): Promise<ClassroomAggregateRoot>;
}