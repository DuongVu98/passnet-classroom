import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { DomainEventFactory } from "src/usecases/events/event.factory";
import { IDomainEvent } from "src/usecases/events/event.interface";
import { CommandFactory } from "src/usecases/commands/command.factory";
import { IEventBus } from "src/usecases/publishers/eventbus.publisher";

export class HttpResponse {
	constructor(private message: string) {}
}

@Controller("home")
export class HomeController {
	private logger: Logger = new Logger("HomeController");

	constructor(private commandFactory: CommandFactory, private domainEventFactory: DomainEventFactory, private domainEventBus: IEventBus<IDomainEvent>) {}

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
		command.execute().then(aggregate => {
            const event = this.domainEventFactory.produceClassroomCreatedEvent(aggregate, aggregate.classroomId);
            this.domainEventBus.publish(event);
        });
		return null;
	}
}
