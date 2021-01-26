import { Body, CacheKey, CacheTTL, Controller, Get, HttpStatus, Logger, Param, Post } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { AddStudentCommand, CreateClassroomCommand, UserAddCommentCommand, UserCreatePostCommand } from "src/domain/commands/commands";
import { CommandFactory } from "src/usecases/factories/command.factory";
import { ViewProjector } from "src/usecases/queries/view.projector";

export class HttpResponse {
	constructor(message: any, status: string) {}
}

@Controller("home")
export class HomeController {
	private logger: Logger = new Logger("HomeController");

	constructor(private commandFactory: CommandFactory, private viewProjector: ViewProjector) {}

	@Post("create-classroom")
	public createClassroom(
		@Body() { teacherId, courseName, taIds }: { teacherId: string; courseName: string; taIds: string[] }
	): Promise<any> {
		const command = Builder(CreateClassroomCommand).teacherId(teacherId).courseName(courseName).taIds(taIds).build();
		const commandExecutor = this.commandFactory.produceCreateClassroomCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
            return new HttpResponse(result, HttpStatus.OK.toString());
        });
	}

	@Post("add-student")
	public addStudentToClassroom(@Body() { studentId, classroomId }: { studentId: string; classroomId: string }): Promise<any> {
		const command = Builder(AddStudentCommand).aggregateId(classroomId).studentId(studentId).build();
		const commandExecutor = this.commandFactory.produceAddStudentCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("create-post")
	public async studentCreatePost(
		@Body() { content, classroomId, postOwnerId }: { content: string; classroomId: string; postOwnerId: string }
	): Promise<any> {
		const command = Builder(UserCreatePostCommand).userId(postOwnerId).aggregateId(classroomId).postContent(content).build();
		const commandExecutor = this.commandFactory.produceUserCreatePostCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("add-comment")
	public userAddComment(
		@Body() { ownerId, postId, content, classroomId }: { ownerId: string; postId: string; content: string; classroomId: string }
	): Promise<any> {
		const command = Builder(UserAddCommentCommand)
			.commentOwnerId(ownerId)
			.postId(postId)
			.content(content)
			.aggregateId(classroomId)
			.build();
		const commandExecutor = this.commandFactory.produceUserAddCommentCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
    }
    
    @CacheTTL(60)
    @CacheKey("classroom_view")
    @Get("classroom-view/:classroomId")
    public getClassroomView(@Param("classroomId") classroomId: string): Promise<any>{
        return this.viewProjector.queryClassroomView(classroomId);
    }
}
