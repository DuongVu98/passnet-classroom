export class CommentAgregate {
	commentId: string;
	content: string;

	withCommentId(id: string): CommentAgregate {
		this.commentId = id;
		return this;
	}
	withContent(content: string): CommentAgregate {
		this.content = content;
		return this;
	}
}
