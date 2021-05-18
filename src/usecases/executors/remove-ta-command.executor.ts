import { Logger } from "@nestjs/common";
import { ClassroomId } from "src/domain/aggregate/vos/value-objects";
import { BaseCommand, RemoveTeacherAssistanceCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandExecutor } from "./command.executor";

export class RemoveTeacherAssistanceCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("AddTeacherAssistanceCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof RemoveTeacherAssistanceCommand) {
			return this.classroomRepository
				.findById(new ClassroomId(command.aggregateId))
				.then((classroom) => {
					if (classroom != null) {
						const newTaList = classroom.teacherAssistanceList.filter((taId) => !(taId.userId.value === command.taId));
						classroom.teacherAssistanceList = newTaList;

						return this.classroomRepository.update(classroom);
					}
				})
				.then((aggregate) => {
					if (aggregate != null) {
						this.logger.log(`handle remove-student-application-event for aggregate ${aggregate}`);
					}
				});
		}
	}
}
