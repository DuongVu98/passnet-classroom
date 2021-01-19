export abstract class AbstractCommandExecutor<COMMAND, RETURN> {
	command: COMMAND;

	abstract execute(): Promise<RETURN>;

	setCommand(command: COMMAND): void {
		this.command = command;
	}
}
