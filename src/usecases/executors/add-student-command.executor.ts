import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { AddStudentCommand } from "src/domain/commands/commands";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Logger } from "@nestjs/common";

export class AddStudentCommandExecutor extends AbstractCommandExecutor<AddStudentCommand, void> {
	logger: Logger = new Logger("AddStudentCommandExecutor");

	execute(): Promise<void> {
		return this.aggregateRepository
			.findById(new ClassroomId(this.command.aggregateId))
			.then((classroom) => {
				classroom.addStudentToClass(new UserId(this.command.studentId));

				return this.aggregateRepository.updateById(classroom, classroom.id);
			})
			.then((aggregate) => {
				this.logger.log(`added new student to aggregate ${aggregate}`);
			});
	}
}
