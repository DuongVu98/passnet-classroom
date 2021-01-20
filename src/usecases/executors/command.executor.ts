import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";

export abstract class AbstractCommandExecutor<COMMAND, RETURN> {
	command: COMMAND;
	aggregateRepository: ClassroomAggregateRootRepository

	abstract execute(): Promise<RETURN>;

	setCommand(command: COMMAND): void {
		this.command = command;
	}
}
