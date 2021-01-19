import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand } from "src/domain/commands/command.abstract";
import { ClassroomAggregateRootRepository } from "src/domain/repostiories-test/classroom.repository";
import { ClassroomAggregateRoot } from "src/domain/aggregate-test/classroom.root";
import { CourseName } from "src/domain/aggregate-test/vos/course-name.vo";
import { UserId } from "src/domain/aggregate-test/vos/user-id.vos";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";

export class CreateClassroomCommand extends BaseCommand {
	teacherId: string;
	courseName: string;
}

export class CreateClassroomCommandExecutor extends AbstractCommandExecutor<CreateClassroomCommand, void> {

	logger: Logger = new Logger("StudentCreatePostCommand");

	aggregateRepository: ClassroomAggregateRootRepository

	execute(): Promise<void> {
		const classroom: ClassroomAggregateRoot = Builder<ClassroomAggregateRoot>()
			.students([])
			.teacherAssistanceList([])
			.teacherId(new UserId(this.command.teacherId))
			.courseName(new CourseName(this.command.courseName))
			.posts([])
			.build();

		return this.aggregateRepository.insert(classroom).then(result => {
			this.logger.log(`Result: ${result}`)
		});
	}

}
