import { Body, Controller, Post } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { CommandFactory } from "src/usecases/commands/command.factory";

export class HttpResponse {
	constructor(private message: string) {}
}

@Controller("home")
export class HomeController {
	constructor(private commandFactory: CommandFactory) {}

	@Post("/create-classroom")
	public createClassroom(
		@Body() { teacherId, courseName, taIds }: { teacherId: string; courseName: string; taIds: string[] }
	): HttpResponse {
        const aggregate = new ClassroomAggregateRoot()
        aggregate.teacherId = teacherId
        aggregate.courseName = courseName
        aggregate.teacherAssistancesId = taIds;

		const command = this.commandFactory.getCreateClassroomCommand(aggregate);
		command.execute();
		return null;
	}
}
