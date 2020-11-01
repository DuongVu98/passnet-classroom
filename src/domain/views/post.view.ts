import { CommentView } from "./comment.view";
import { StudentView } from "./student.view";

export class PostView {
	postId: string;
	postOwner: StudentView;
	content: string;
	comments: CommentView[];

	withPostId(id: string): PostView {
		this.postId = id;
		return this;
	}
	withPostOwner(postOwner: StudentView): PostView {
		this.postOwner = postOwner;
		return this;
	}
	withContent(content: string): PostView {
		this.content = content;
		return this;
	}
	withComments(comments: CommentView[]): PostView {
		this.comments = comments;
		return this;
	}
}
