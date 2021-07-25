export class ClassroomView {
	classroomId: string;
	courseName: string;
	students: string[];
	teacher: string;
	assistants: string[];
	posts: PostView[];
	code: string;
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

export class ClassroomLiteView {
	classroomId: string;
	courseName: string;
	code: string;
}
