import { Body, Controller, Get, HttpStatus, Logger, Param, Post } from "@nestjs/common";
import { Builder } from "builder-pattern";
import {
	AddStudentCommand,
	CreateClassroomCommand,
	AddCommentCommand,
	CreatePostCommand,
	JoinClassroomByCodeCommand,
} from "src/domain/commands/commands";
import { CommandFactory } from "src/usecases/factories/command.factory";

export class HttpResponse {
	constructor(message: any, status: string) {}
}

@Controller("api/classrooms")
export class ClassroomController {
	private logger: Logger = new Logger("HomeController");

	constructor(private commandFactory: CommandFactory) {}

	@Post("create-classroom")
	public createClassroom(
		@Body()
		{
			teacherId,
			courseName,
			taIds,
			jobId,
			organizationId,
		}: {
			teacherId: string;
			courseName: string;
			taIds: string[];
			jobId: string;
			organizationId: string;
		}
	): Promise<any> {
		const command = Builder(CreateClassroomCommand)
			.teacherId(teacherId)
			.courseName(courseName)
			.taIds(taIds)
			.jobId(jobId)
			.organizationId(organizationId)
			.build();
		const commandExecutor = this.commandFactory.produce(command);

		return commandExecutor.execute(command).then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post(":id/add-student")
	public addStudentToClassroom(@Param("id") classroomId: string, @Body() { studentId }: { studentId: string }): Promise<any> {
		this.logger.debug(`body received: ${classroomId}`);

		const command = Builder(AddStudentCommand).aggregateId(classroomId).studentId(studentId).build();
		const commandExecutor = this.commandFactory.produce(command);

		return commandExecutor.execute(command).then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post(":id/create-post")
	public async studentCreatePost(
		@Param("id") classroomId: string,
		@Body() { content, postOwnerId }: { content: string; postOwnerId: string }
	): Promise<any> {
		const command = Builder(CreatePostCommand).userId(postOwnerId).aggregateId(classroomId).postContent(content).build();
		const commandExecutor = this.commandFactory.produce(command);

		return commandExecutor.execute(command).then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post(":id/add-comment")
	public userAddComment(
		@Param("id") classroomId: string,
		@Body() { ownerId, postId, content }: { ownerId: string; postId: string; content: string }
	): Promise<any> {
		const command = Builder(AddCommentCommand).commentOwnerId(ownerId).postId(postId).content(content).aggregateId(classroomId).build();
		const commandExecutor = this.commandFactory.produce(command);

		return commandExecutor.execute(command).then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("join-class")
	public joinClassroomByCode(@Body() { classCode, profileId, orgId }: { classCode: string; profileId: string; orgId: string }) {
		const command = Builder(JoinClassroomByCodeCommand).aggregateId("").classCode(classCode).memberId(profileId).orgId(orgId).build();
		const commandExecutor = this.commandFactory.produce(command);

		return commandExecutor.execute(command).then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}
}
