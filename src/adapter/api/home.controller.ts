import { Body, Controller, Get, Inject, Logger, Param, Post } from "@nestjs/common";
import { DomainEventFactory, IDomainEvent } from "src/usecases/events/event.factory";
import { IEventBus } from "src/usecases/publishers/eventbus.publisher";
import { QueryFactory } from "src/usecases/queries/query.factory";
import { ClassroomViewDto } from "src/domain/views/classroom.view";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.root";

export class HttpResponse {
	constructor(private message: any) {}
}

@Controller("home")
export class HomeController {
	private logger: Logger = new Logger("HomeController");

	constructor(
		private queryFactory: QueryFactory,
		private domainEventFactory: DomainEventFactory,
		@Inject("domain-event-bus") private domainEventBus: IEventBus<IDomainEvent>
	) {}

	@Post("create-classroom")
	public createClassroom(
		@Body() { teacherId, courseName, taIds }: { teacherId: string; courseName: string; taIds: string[] }
	): HttpResponse {
		this.logger.debug(`courseName --> ${courseName}`);
		const aggregate = new ClassroomAggregateRoot().withCourseName(courseName).withTeacherId(teacherId).withTeacherAssistancesId(taIds);

		const command = this.commandFactory.produceCreateClassroomCommand(aggregate);
		command.execute().then((aggregate) => {
			const event = this.domainEventFactory.produceClassroomCreatedEvent(aggregate, aggregate.classroomId);
			this.domainEventBus.publish(event);
		});
		return null;
	}

	@Post("add-student")
	public addStudentToClassroom(@Body() { studentId, classroomId }: { studentId: string; classroomId: string }): void {
		const aggregate = new UserAggregate().withUid(studentId).withOnlineState(false);
		const command = this.commandFactory.produceAddStudentCommand(aggregate, classroomId);

		command
			.execute()
			.then((aggregate) => {
				this.logger.debug(`command executed --> ${JSON.stringify(aggregate)}`);
				const event = this.domainEventFactory.produceStudentAddedEvent(aggregate, classroomId);
				this.domainEventBus.publish(event);
			})
			.catch((error) => {
				this.logger.error(`catch error --> ${error}`);
				throw error;
			});
	}

	@Post("create-post")
	public async studentCreatePost(
		@Body() { content, classroomId, postOwnerId }: { content: string; classroomId: string; postOwnerId: string }
	): Promise<any> {
		const newPostAggregate = new PostAggregate().withContent(content).withPostOwnerId(postOwnerId).withComments([]);
		const command = this.commandFactory.produceStudentCreatePostCommand(newPostAggregate, classroomId);

		let response;
		await command
			.execute()
			.then((aggregate) => {
				this.logger.debug(`command executed --> ${JSON.stringify(aggregate)}`);
				const event = this.domainEventFactory.producePostCreatedEvent(aggregate, classroomId);
				this.domainEventBus.publish(event);
			})
			.catch((error) => {
				this.logger.error(`catch error in studentCreatePost() --> ${error}`);
				response = new HttpResponse(error);
			});

		if (response) {
			return response;
		} else {
			return new HttpResponse("executed");
		}
	}

	@Post("add-comment")
	public async userAddComment(@Body() { ownerId, postId, content }: { ownerId: string; postId: string; content: string }): Promise<any> {
		const aggregate = new CommentAgregate().withCommentOwnerId(ownerId).withContent(content).withPostId(postId);
		const command = this.commandFactory.produceUserAddCommentCommand(aggregate);

		let response;
		await command.execute().then((commentAggregate) => {
			this.logger.debug(`command executed produce aggregate --> ${commentAggregate}`);
			const event = this.domainEventFactory.produceCommentAddedEvent(commentAggregate);
			this.domainEventBus.publish(event);
		});
		// .catch((exception) => {
		// 	this.logger.error(`catch error in userAddComment() --> ${exception}`);
		// 	response = new HttpResponse(exception);
		// });

		if (response) {
			return response;
		} else {
			return new HttpResponse("executed");
		}
	}

	@Get("classroom-view/:aggregateRootId")
	public getClassroomView(@Param("aggregateRootId") aggregateRootId: string): Promise<ClassroomViewDto> {
		return this.queryFactory.produceClassroomViewQuery(aggregateRootId).get();
	}
}
