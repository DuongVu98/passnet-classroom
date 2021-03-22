import { Body, Controller, Get, HttpStatus, Logger, Param, Post, UseFilters } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { AddStudentCommand, CreateClassroomCommand, UserAddCommentCommand, UserCreatePostCommand } from "src/domain/commands/commands";
import { CommandFactory } from "src/usecases/factories/command.factory";
import { ViewProjector } from "src/usecases/queries/view.projector";
import { Cacheable, CacheClear } from "@type-cacheable/core";
import * as IoRedis from "ioredis";
import { useAdapter } from "@type-cacheable/redis-adapter";
import { ClassroomNotCreatedExceptionHandler, ClassroomNotFoundExceptionHandler } from "../filters/exception-handler.filter";
import { GetClassroomViewForm, GetClassroomviewFromJobForm } from "src/domain/forms/query.form";

export class HttpResponse {
	constructor(message: any, status: string) {}
}

const userClient = new IoRedis({
	lazyConnect: true,
	host: "192.168.99.100",
	port: 6379,
});
const clientAdapter = useAdapter(userClient);

@Controller("home")
export class HomeController {
	private logger: Logger = new Logger("HomeController");

	constructor(private commandFactory: CommandFactory, private viewProjector: ViewProjector) {}

	@Post("create-classroom")
	public createClassroom(
		@Body() { teacherId, courseName, taIds, jobId }: { teacherId: string; courseName: string; taIds: string[]; jobId: string }
	): Promise<any> {
		const command = Builder(CreateClassroomCommand).teacherId(teacherId).courseName(courseName).taIds(taIds).jobId(jobId).build();
		const commandExecutor = this.commandFactory.produceCreateClassroomCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("add-student")
	// @CacheClear({ cacheKey: (args: any[]) => args[0].classroomId, client: clientAdapter })
	public addStudentToClassroom(@Body() { studentId, classroomId }: { studentId: string; classroomId: string }): Promise<any> {
		this.logger.debug(`body received: ${classroomId}`);

		const command = Builder(AddStudentCommand).aggregateId(classroomId).studentId(studentId).build();
		const commandExecutor = this.commandFactory.produceAddStudentCommandExecutor(command);

		return commandExecutor.execute().then((result) => {
			return new HttpResponse(result, HttpStatus.OK.toString());
		});
	}

	@Post("create-post")
	// @CacheClear({ cacheKey: (args: any[]) => args[0].classroomId, client: clientAdapter })
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
	// @CacheClear({ cacheKey: (args: any[]) => args[0].classroomId, client: clientAdapter })
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

    /**
     * TODO: Validate classroom ID
     * Classroom ID is expected to have 24 hex string characters
     * @param classroomId 
     * @returns 
     */
	@Post("classroom-view/classroom-id")
	// @Cacheable({ cacheKey: (args: any[]) => args[0], client: clientAdapter, ttlSeconds: 60 })
	public getClassroomView(@Body() getClassroomViewForm: GetClassroomViewForm): Promise<any> {
		return this.viewProjector.queryClassroomView(getClassroomViewForm.classroomId);
	}

    @Post("classroom-view/job-id")
    @UseFilters(ClassroomNotFoundExceptionHandler, ClassroomNotCreatedExceptionHandler)
    public getClassroomViewFromJob(@Body() getClassroomviewFromJobForm: GetClassroomviewFromJobForm): Promise<any> {
        return this.viewProjector.queryClassroomViewFromJob(getClassroomviewFromJobForm.jobId);
    }
}
