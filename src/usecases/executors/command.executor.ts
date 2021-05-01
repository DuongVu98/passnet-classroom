import { BaseCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRepository } from "src/domain/repositories/aggregate.repository";

export abstract class AbstractCommandExecutor<COMMAND, RETURN> {
	command: COMMAND;
	aggregateRepository: ClassroomAggregateRepository;

	public abstract execute(): Promise<RETURN>;

	public setCommand(command: COMMAND): void {
		this.command = command;
	}
}

export interface CommandExecutor {
    execute(command: BaseCommand): Promise<any>
}
