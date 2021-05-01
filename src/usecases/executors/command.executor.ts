import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";

export abstract class AbstractCommandExecutor<COMMAND, RETURN> {
	command: COMMAND;
	aggregateRepository: ClassroomAggregateRepository;

	public abstract execute(): Promise<RETURN>;

	public setCommand(command: COMMAND): void {
		this.command = command;
	}
}
