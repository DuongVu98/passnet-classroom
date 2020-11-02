import { Aggregate } from "./aggregate";

export class CommentAgregate extends Aggregate {
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
	withAggregateRooTidentifier(id: string): CommentAgregate {
		super.withAggregateRooTidentifier(id);
		return this;
	}
}
