import { AbstractCommandExecutor, CommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, CreateClassroomCommand } from "src/domain/commands/commands";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom, Member, Post } from "src/domain/aggregate/domain.entities";
import { Content, CourseName, Job, User } from "src/domain/aggregate/value-objects";

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

		return this.aggregateRepository.insertClassroom(classroom).then((result) => {
			this.logger.log(`Result: ${JSON.stringify(result)}`);
		});
	}
}

export class CreateClassroomCommandExecutorTest implements CommandExecutor {
    logger: Logger = new Logger("CreateClassroomCommandExecutor");
    
    constructor(){}

    execute(command: BaseCommand): Promise<any> {
        if (command instanceof CreateClassroomCommand) {
            const teacherAssistanceList = command.taIds.map((id) => Builder(Member).uid(id).build());
        } else {
            return Promise.reject();
        }
    }
	
}
