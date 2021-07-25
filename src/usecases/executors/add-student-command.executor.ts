import { CommandExecutor } from "src/usecases/executors/command.executor";
import { AddStudentCommand, BaseCommand } from "src/domain/commands/commands";
import { Logger } from "@nestjs/common";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomDomainFunctions } from "src/domain/aggregate/entities/classroom.root";
import { ClassroomId, ProfileId, Role } from "src/domain/aggregate/vos/value-objects";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { Builder } from "builder-pattern";
import { CommandNotCompatibleException } from "src/domain/exceptions/exceptions";

export class AddStudentCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("AddStudentCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof AddStudentCommand) {
			this.logger.debug(`log aggregateId from command -> ${command.aggregateId}`);

			return this.classroomRepository
				.findById(new ClassroomId(command.aggregateId))
				.then(async (classroom) => {
					const aggregate = await new ClassroomDomainFunctions(classroom).addStudentToClass(
						Builder(Member).profileId(new ProfileId(command.studentId)).role(Role.STUDENT).build()
					);
					return this.classroomRepository.update(aggregate);
				})
				.then((aggregate) => {
					this.logger.log(`added new student to classroom ${aggregate}`);
				});
		} else {
			return Promise.reject(new CommandNotCompatibleException("AddStudentCommand"));
		}
	}
}
