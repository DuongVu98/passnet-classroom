import { BaseCommand } from "src/domain/commands/commands";

export interface CommandExecutor {
	execute(command: BaseCommand): Promise<any>;
}
