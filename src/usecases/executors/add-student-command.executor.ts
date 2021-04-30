import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { AddStudentCommand } from "src/domain/commands/commands";
import { Logger } from "@nestjs/common";
import { User } from "src/domain/aggregate-sql/value-objects";

export class AddStudentCommandExecutor extends AbstractCommandExecutor<AddStudentCommand, void> {
	logger: Logger = new Logger("AddStudentCommandExecutor");

	execute(): Promise<void> {
		this.logger.debug(`log aggregateId from command -> ${this.command.aggregateId}`);

		return this.aggregateRepository
			.findById(this.command.aggregateId)
			.then(async (classroom) => {
				await classroom.addStudentToClassroom(new User(this.command.studentId));
				return this.aggregateRepository.update(classroom);
			})
			.then((aggregate) => {
				this.logger.log(`added new student to classroom ${aggregate}`);
			});
	}
}
