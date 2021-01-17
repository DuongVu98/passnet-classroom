import { ClassroomAggregateRoot } from "src/domain/aggregate-test/classroom.root";
import { AbstractCommand } from "./command.factory-test";

export class CreateClassroomCommand extends AbstractCommand {

    aggregate: ClassroomAggregateRoot;
    

	async execute(): Promise<ClassroomAggregateRoot> {
		throw new Error("Method not implemented.");
	}
}
