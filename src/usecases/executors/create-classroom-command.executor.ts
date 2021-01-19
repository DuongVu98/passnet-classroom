import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, CreateClassroomCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.root";
import { CourseName } from "src/domain/aggregate/vos/course-name.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";

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
