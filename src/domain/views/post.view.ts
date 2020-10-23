import { CommentView } from "./comment.view";
import { StudentView } from "./student.view";

export class PostView {
	postId: string;
	postOwner: StudentView;
	content: string;
	comments: CommentView[];
}
