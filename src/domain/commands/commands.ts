export class BaseCommand {
	aggregateId: string;
}

export class CreateClassroomCommand extends BaseCommand {
	teacherId: string;
	courseName: string;
	taIds: string[];
	jobId: string;
}

export class AddStudentCommand extends BaseCommand {
	studentId: string;
}

export class UserCreatePostCommand extends BaseCommand {
	userId: string;
	postContent: string;
}

export class UserAddCommentCommand extends BaseCommand {
	commentOwnerId: string;
	postId: string;
	content: string;
}

export class AddTeacherAssistanceCommand extends BaseCommand {
    taId: string;
}

export class RemoveTeacherAssistanceCommand extends BaseCommand {
    taId: string;
}
