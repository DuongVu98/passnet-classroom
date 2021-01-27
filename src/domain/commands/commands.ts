export class BaseCommand {}

export class CreateClassroomCommand extends BaseCommand {
	teacherId: string;
	courseName: string;
	taIds: string[];
}

export class AddStudentCommand extends BaseCommand {
	studentId: string;
	aggregateId: string;
}

export class UserCreatePostCommand extends BaseCommand {
	userId: string;
	postContent: string;
	aggregateId: string;
}

export class UserAddCommentCommand extends BaseCommand {
	commentOwnerId: string;
	aggregateId: string;
	postId: string;
	content: string;
}
