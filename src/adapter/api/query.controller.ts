import { Body, Controller, Get, Logger, Param, Post, Query, UseFilters } from "@nestjs/common";
import { GetClassroomViewForm, GetClassroomviewFromJobForm } from "src/domain/forms/query.form";
import { MemberView, PostView } from "src/domain/views/views";
import { ViewProjector } from "src/usecases/queries/view.projector";
import { ClassroomNotCreatedExceptionHandler, ClassroomNotFoundExceptionHandler } from "../filters/exception-handler.filter";

@Controller("api/query")
export class QueryController {
	logger: Logger = new Logger("QueryController");

	constructor(private viewProjector: ViewProjector) {}

	@Get("classrooms/by-id")
	public getClassroomView(@Query("id") classroomId: string): Promise<any> {
		return this.viewProjector.queryClassroomView(classroomId);
	}

	@Post("classrooms/by-job")
	@UseFilters(ClassroomNotFoundExceptionHandler, ClassroomNotCreatedExceptionHandler)
	public getClassroomViewFromJob(@Body() getClassroomviewFromJobForm: GetClassroomviewFromJobForm): Promise<any> {
		return this.viewProjector.queryClassroomViewFromJob(getClassroomviewFromJobForm.jobId);
	}

	@Get("classrooms/by-role")
	public getClassroomListByMemberType(@Query("profileId") profileId: string, @Query("role") memberType: string): Promise<any> {
		return this.viewProjector.getClassroomListByMemberType(memberType, profileId);
	}

	@Get("classrooms/:id/posts")
	@UseFilters(ClassroomNotFoundExceptionHandler, ClassroomNotCreatedExceptionHandler)
	public getAllPostsFromClassroom(@Param("id") id: string): Promise<PostView[]> {
		return this.viewProjector.queryClassroomView(id).then((classroomView) => {
			return classroomView.posts;
		});
	}

	@Get("classrooms/:id/members")
	@UseFilters(ClassroomNotFoundExceptionHandler)
	public getClassroomMembers(@Param("id") classroomId: string): Promise<MemberView[]> {
		return this.viewProjector.getClassroomMembers(classroomId);
	}
}
