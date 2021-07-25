import { Logger } from "@nestjs/common";
import { ClassroomId } from "src/domain/aggregate/vos/value-objects";
import { BaseCommand, RemoveAssistantCommand } from "src/domain/commands/commands";
import { CommandNotCompatibleException } from "src/domain/exceptions/exceptions";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandExecutor } from "./command.executor";

export class RemoveAssistantCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("AddTeacherAssistanceCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof RemoveAssistantCommand) {
			return this.classroomRepository
				.findById(new ClassroomId(command.aggregateId))
				.then((classroom) => {
					if (classroom != null) {
						const newTaList = classroom.assistants.filter((taId) => !(taId.profileId.value === command.taId));
						classroom.assistants = newTaList;

						return this.classroomRepository.update(classroom);
					}
				})
				.then((aggregate) => {
					if (aggregate != null) {
						this.logger.log(`handle remove-student-application-event for aggregate ${aggregate}`);
					}
				});
		} else {
			return Promise.reject(new CommandNotCompatibleException("RemoveAssistantCommand"));
		}
	}
}
