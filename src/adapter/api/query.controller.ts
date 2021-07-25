import { Body, Controller, Get, Param, Post, Query, UseFilters } from "@nestjs/common";
import { GetClassroomViewForm, GetClassroomviewFromJobForm } from "src/domain/forms/query.form";
import { PostView } from "src/domain/views/views";
import { ViewProjector } from "src/usecases/queries/view.projector";
import { ClassroomNotCreatedExceptionHandler, ClassroomNotFoundExceptionHandler } from "../filters/exception-handler.filter";

@Controller("api/query")
export class QueryController {
	constructor(private viewProjector: ViewProjector) {}

	@Get("classrooms/:id")
	public getClassroomView(@Body() getClassroomViewForm: GetClassroomViewForm): Promise<any> {
		return this.viewProjector.queryClassroomView(getClassroomViewForm.classroomId);
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
}
