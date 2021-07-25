import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { ClassroomId, ProfileId, Role } from "src/domain/aggregate/vos/value-objects";
import { AddAssistantCommand, BaseCommand } from "src/domain/commands/commands";
import { CommandNotCompatibleException } from "src/domain/exceptions/exceptions";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandExecutor } from "./command.executor";

export class AddAssistantCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("AddTeacherAssistanceCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof AddAssistantCommand) {
			return this.classroomRepository
				.findById(new ClassroomId(command.aggregateId))
				.then(async (classroom) => {
					this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

					if (classroom != null) {
						await classroom.members.push(Builder(Member).profileId(new ProfileId(command.taId)).role(Role.ASSISTANT).build());
						this.logger.log(`log updated classroom ${JSON.stringify(classroom.assistants)}`);
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
		} else {
			return Promise.reject(new CommandNotCompatibleException("AddAssistantCommand"));
		}
	}
}
