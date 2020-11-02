import { Body, Controller, Get, Inject, Logger, Param, Post } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { DomainEventFactory, IDomainEvent } from "src/usecases/events/event.factory";
import { CommandFactory } from "src/usecases/commands/command.factory";
import { IEventBus } from "src/usecases/publishers/eventbus.publisher";
import { QueryFactory } from "src/usecases/queries/query.factory";
import { ClassroomViewDto } from "src/domain/views/classroom.view";

export class HttpResponse {
	constructor(private message: string) {}
}

@Controller("home")
export class HomeController {
	private logger: Logger = new Logger("HomeController");

	constructor(
		private queryFactory: QueryFactory,
		private commandFactory: CommandFactory,
		private domainEventFactory: DomainEventFactory,
		@Inject("domain-event-bus") private domainEventBus: IEventBus<IDomainEvent>
	) {}

	@Post("create-classroom")
	public createClassroom(
		@Body() { teacherId, courseName, taIds }: { teacherId: string; courseName: string; taIds: string[] }
	): HttpResponse {
		this.logger.log(`courseName --> ${courseName}`);
		const aggregate = new ClassroomAggregateRoot().withCourseName(courseName).withTeacherId(teacherId).withTeacherAssistancesId(taIds);

		const command = this.commandFactory.getCreateClassroomCommand(aggregate);
		command.execute().then((aggregate) => {
			const event = this.domainEventFactory.produceClassroomCreatedEvent(aggregate, aggregate.classroomId);
			this.domainEventBus.publish(event);
		});
		return null;
	}

	@Get("classroom-view/:aggregateRootId")
	public getClassroomView(@Param("aggregateRootId") aggregateRootId: string): Promise<ClassroomViewDto> {
		return this.queryFactory.produceClassroomViewQuery(aggregateRootId).get();
	}
}
