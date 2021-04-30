import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsHexString } from "../constraints/constraints";

export class GetClassroomViewForm {
	// @Length(24, 24)
	// @IsHexString("hexString", { message: "Invalid ID" })
	classroomId: string;
}

export class GetClassroomviewFromJobForm {
	@IsString()
	@IsNotEmpty()
	jobId: string;
}
