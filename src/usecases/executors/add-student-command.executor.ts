import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { AddStudentCommand, BaseCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomId } from "src/domain/aggregate/vos/classroom-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";

export class AddStudentCommandExecutor extends AbstractCommandExecutor<AddStudentCommand, void> {

	aggregateRepository: ClassroomAggregateRootRepository;

	execute(): Promise<void> {
		return this.aggregateRepository.findById(new ClassroomId(this.command.aggregateId)).then(classroom => {
			classroom.addStudentToClass(new UserId(this.command.studentId));
		});
	}
}
