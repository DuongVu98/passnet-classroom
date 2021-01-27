export class ClassroomView {
	classroomId: string;
	courseName: string;
	students: string[];
	teacher: string;
	teacherAssistanceList: string[];
	posts: PostView[];
}

export class PostView {
	postId: string;
	postOwner: string;
	content: string;
	comments: CommentView[];
}

export class CommentView {
	commentId: string;
	commentOwner: string;
	content: string;
}
