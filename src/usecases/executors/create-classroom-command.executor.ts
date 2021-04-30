import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { CreateClassroomCommand } from "src/domain/commands/commands";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom, Member, Post } from "src/domain/aggregate-sql/domain.entities";
import { Content, CourseName, Job, User } from "src/domain/aggregate-sql/value-objects";

export class CreateClassroomCommandExecutor extends AbstractCommandExecutor<CreateClassroomCommand, any> {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	public async execute(): Promise<any> {
		const teacherAssistanceList = this.command.taIds.map((id) => Builder(Member).uid(id).build());

		const classroom: Classroom = Builder(Classroom)
			.students([])
			.teacherAssistanceList(teacherAssistanceList)
			.teacher(new User(this.command.teacherId))
			.courseName(new CourseName(this.command.courseName))
			.posts([])
			.job(new Job(this.command.jobId))
			.build();

		return this.aggregateRepository.insert(classroom).then((result) => {
			this.logger.log(`Result: ${JSON.stringify(result)}`);
		});
	}
}
