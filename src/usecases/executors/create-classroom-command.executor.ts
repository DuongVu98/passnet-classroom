import { CommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, CreateClassroomCommand } from "src/domain/commands/commands";
import { Classroom } from "src/domain/aggregate/entities/classroom.root";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { rejects } from "assert";
import { CourseName, Job, UserId } from "src/domain/aggregate/vos/value-objects";

export class CreateClassroomCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof CreateClassroomCommand) {
			const teacherAssistanceList = command.taIds.map((id) => new Member(new UserId(id)));

			const classroom: Classroom = Builder(Classroom)
				.students([])
				.teacherAssistanceList(teacherAssistanceList)
				.teacherId(new Member(new UserId(command.teacherId)))
				.courseName(new CourseName(command.courseName))
				.posts([])
				.jobId(new Job(command.jobId))
				.build();

			return this.classroomRepository.insert(classroom).then((result) => {
				this.logger.log(`Result: ${result}`);
			});
		} else {
			return Promise.reject();
		}
	}
}
