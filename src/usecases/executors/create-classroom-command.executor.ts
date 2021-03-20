import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { CreateClassroomCommand } from "src/domain/commands/commands";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.root";
import { CourseName } from "src/domain/aggregate/vos/course-name.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { JobId } from "src/domain/aggregate/vos/job-id.vo";

export class CreateClassroomCommandExecutor extends AbstractCommandExecutor<CreateClassroomCommand, any> {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	public async execute(): Promise<any> {
		const teacherAssistanceList = this.command.taIds.map((id) => new UserId(id));

		const classroom: ClassroomAggregateRoot = Builder(ClassroomAggregateRoot)
			.students([])
			.teacherAssistanceList(teacherAssistanceList)
			.teacherId(new UserId(this.command.teacherId))
			.courseName(new CourseName(this.command.courseName))
			.posts([])
			.jobId(new JobId(this.command.jobId))
			.build();

		return this.aggregateRepository.insert(classroom).then((result) => {
			this.logger.log(`Result: ${result}`);
		});
	}
}
