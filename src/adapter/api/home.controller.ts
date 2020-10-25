import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { CommandFactory } from "src/usecases/commands/command.factory";

export class HttpResponse {
	constructor(private message: string) {}
}

@Controller("home")
export class HomeController {
	private logger: Logger = new Logger("HomeController");

	constructor(private commandFactory: CommandFactory) {}

	@Post("/create-classroom")
	public createClassroom(
		@Body() { teacherId, courseName, taIds }: { teacherId: string; courseName: string; taIds: string[] }
	): HttpResponse {
		this.logger.log(`courseName --> ${courseName}`);
		const aggregate = new ClassroomAggregateRoot()
			.withCourseName(courseName)
			.withTeacherId(teacherId)
			.withTeacherAssistancesId(taIds);

		const command = this.commandFactory.getCreateClassroomCommand(aggregate);
		command.execute();
		return null;
	}
}
