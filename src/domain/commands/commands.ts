export class BaseCommand {
	aggregateId: string;
}

export class CreateClassroomCommand extends BaseCommand {
	teacherId: string;
	courseName: string;
	taIds: string[];
	jobId: string;
	organizationId: string;
}

export class AddStudentCommand extends BaseCommand {
	studentId: string;
}

export class CreatePostCommand extends BaseCommand {
	userId: string;
	postContent: string;
}

export class AddCommentCommand extends BaseCommand {
	commentOwnerId: string;
	postId: string;
	content: string;
}

export class AddAssistantCommand extends BaseCommand {
	taId: string;
}

export class RemoveAssistantCommand extends BaseCommand {
	taId: string;
}
export class JoinClassroomByCodeCommand extends BaseCommand {
	memberId: string;
	classCode: string;
	orgId: string;
}
