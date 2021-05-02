import { IsNotEmpty, IsString } from "class-validator";

export class GetClassroomViewForm {
	@IsString()
	@IsNotEmpty()
	classroomId: string;
}

export class GetClassroomviewFromJobForm {
	@IsString()
	@IsNotEmpty()
	jobId: string;
}
