import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand } from "src/domain/commands/command.abstract";
import { ClassroomAggregateRootRepository } from "src/domain/repostiories-test/classroom.repository";
import { ClassroomId } from "src/domain/aggregate-test/vos/classroom-id.vo";
import { UserId } from "src/domain/aggregate-test/vos/user-id.vos";

export class AddStudentCommand extends BaseCommand{
	studentId: string;
	aggregateId: string;
}

export class AddStudentCommandExecutor extends AbstractCommandExecutor<AddStudentCommand, void> {

	aggregateRepository: ClassroomAggregateRootRepository;

	execute(): Promise<void> {
		return this.aggregateRepository.findById(new ClassroomId(this.command.aggregateId)).then(classroom => {
			classroom.addStudentToClass(new UserId(this.command.studentId));
		});
	}
}
