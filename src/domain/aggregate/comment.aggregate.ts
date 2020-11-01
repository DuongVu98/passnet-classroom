export class CommentAgregate {
	commentId: string;
	postId: string;
	commentOwnerId: string;
	content: string;

	withCommentId(id: string): CommentAgregate {
		this.commentId = id;
		return this;
    }
    withPostId(id: string): CommentAgregate {
        this.postId = id;
        return this;
    }
    withCommentOwnerId(id: string): CommentAgregate {
        this.commentOwnerId = id;
        return this;
    }
	withContent(content: string): CommentAgregate {
		this.content = content;
		return this;
	}
}
