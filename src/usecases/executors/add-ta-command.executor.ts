import { Logger } from "@nestjs/common";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { ClassroomId, UserId } from "src/domain/aggregate/vos/value-objects";
import { AddTeacherAssistanceCommand, BaseCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandExecutor } from "./command.executor";

export class AddTeacherAssistanceCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("AddTeacherAssistanceCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof AddTeacherAssistanceCommand) {
			return this.classroomRepository
				.findById(new ClassroomId(command.aggregateId))
				.then(async (classroom) => {
					this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

					if (classroom != null) {
						await classroom.teacherAssistanceList.push(new Member(new UserId(command.taId)));
						this.logger.log(`log updated classroom ${JSON.stringify(classroom.teacherAssistanceList)}`);
						return this.classroomRepository.update(classroom);
					}
				})
				.then((aggregate) => {
					if (aggregate != null) {
						this.logger.log(`handle accept-student-application-event for aggregate ${aggregate}`);
					} else {
						this.logger.log(`aggregate after updated is null: ${aggregate}`);
					}
				});
		}
	}
}
