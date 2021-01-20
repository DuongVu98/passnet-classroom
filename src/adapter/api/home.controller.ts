import { Body, Controller, Get, HttpStatus, Inject, Logger, Param, Post } from "@nestjs/common";
import { DomainEventFactory, IDomainEvent } from "src/usecases/events/event.factory";
import { IEventBus } from "src/usecases/publishers/eventbus.publisher";
import { QueryFactory } from "src/usecases/queries/query.factory";
import { ClassroomViewDto } from "src/domain/views/classroom.view";
import { CommandFactory } from "src/usecases/factories/command.factory";
import { AddStudentCommand, CreateClassroomCommand, UserAddCommentCommand, UserCreatePostCommand } from "src/domain/commands/commands";
import { Builder } from "builder-pattern";

export class HttpResponse {
	constructor(private message: any, status: string) {}
}

@Controller("home")
export class HomeController {
	private logger: Logger = new Logger("HomeController");

	constructor(
		private commandFactory: CommandFactory,
		private queryFactory: QueryFactory,
		private domainEventFactory: DomainEventFactory,
		@Inject("domain-event-bus") private domainEventBus: IEventBus<IDomainEvent>
	) {}

	@Post("create-classroom")
	public createClassroom(
		@Body() { teacherId, courseName, taIds }: { teacherId: string; courseName: string; taIds: string[] }
	): Promise<any> {
		const command = Builder<CreateClassroomCommand>().teacherId(teacherId).courseName(courseName).taIds(taIds).build();
		const commandExecutor = this.commandFactory.produceCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("add-student")
	public addStudentToClassroom(@Body() { studentId, classroomId }: { studentId: string; classroomId: string }): Promise<any> {
		const command = Builder<AddStudentCommand>().aggregateId(classroomId).studentId(studentId).build();
		const commandExecutor = this.commandFactory.produceCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("create-post")
	public async studentCreatePost(
		@Body() { content, classroomId, postOwnerId }: { content: string; classroomId: string; postOwnerId: string }
	): Promise<any> {
		const command = Builder<UserCreatePostCommand>().userId(postOwnerId).aggregateId(classroomId).postContent(content).build();
		const commandExecutor = this.commandFactory.produceCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("add-comment")
	public async userAddComment(
		@Body() { ownerId, postId, content, classroomId }: { ownerId: string; postId: string; content: string; classroomId: string }
	): Promise<any> {
		const command = Builder<UserAddCommentCommand>()
			.commentOwnerId(ownerId)
			.postId(postId)
			.content(content)
			.aggregateId(classroomId)
			.build();
		const commandExecutor = this.commandFactory.produceCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Get("classroom-view/:aggregateRootId")
	public getClassroomView(@Param("aggregateRootId") aggregateRootId: string): Promise<ClassroomViewDto> {
		return this.queryFactory.produceClassroomViewQuery(aggregateRootId).get();
	}
}
