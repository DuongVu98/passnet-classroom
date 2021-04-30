import { ClassroomRepository } from "src/domain/repositories-sql/aggregate.repository";

export abstract class AbstractCommandExecutor<COMMAND, RETURN> {
	command: COMMAND;
	aggregateRepository: ClassroomRepository;

	public abstract execute(): Promise<RETURN>;

	public setCommand(command: COMMAND): void {
		this.command = command;
	}
}
