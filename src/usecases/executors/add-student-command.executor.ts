import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { AddStudentCommand } from "src/domain/commands/commands";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Logger } from "@nestjs/common";
import { ClassroomAggregateDomain } from "src/domain/aggregate/classroom.root";

export class AddStudentCommandExecutor extends AbstractCommandExecutor<AddStudentCommand, void> {
	logger: Logger = new Logger("AddStudentCommandExecutor");

	execute(): Promise<void> {
		this.logger.debug(`log aggregateId from command -> ${this.command.aggregateId}`);

		return this.aggregateRepository
			.findById(new ClassroomId(this.command.aggregateId))
			.then(async (classroom) => {
				// await classroom.students.push(new UserId(this.command.studentId));

				const aggregate = await new ClassroomAggregateDomain(classroom).addStudentToClass(new UserId(this.command.studentId));
				return this.aggregateRepository.update(aggregate);
			})
			.then((aggregate) => {
				this.logger.log(`added new student to classroom ${aggregate}`);
			});
	}
}
