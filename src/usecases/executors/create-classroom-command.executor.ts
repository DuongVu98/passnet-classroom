import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { CreateClassroomCommand } from "src/domain/commands/commands";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom } from "src/domain/aggregate-sql/entities";
import { CourseName, Job, User } from "src/domain/aggregate-sql/value-objects";

export class CreateClassroomCommandExecutor extends AbstractCommandExecutor<CreateClassroomCommand, any> {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	public async execute(): Promise<any> {
		const teacherAssistanceList = this.command.taIds.map((id) => new User(id));

		const classroom: Classroom = Builder(Classroom)
			.students([])
			.teacherAssistanceList(teacherAssistanceList)
			.teacher(new User(this.command.teacherId))
			.courseName(new CourseName(this.command.courseName))
			.posts([])
			.job(new Job(this.command.jobId))
			.build();

		return this.aggregateRepository.insert(classroom).then((result) => {
			this.logger.log(`Result: ${result}`);
		});
	}
}
