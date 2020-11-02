export class PostAggregate {
	postId: string;
	postOwnerId: string;
	content: string;
	comments: string[];

	withPostId(id: string): PostAggregate {
		this.postId = id;
		return this;
	}
	withPostOwnerId(id: string): PostAggregate {
		this.postOwnerId = id;
		return this;
	}
	withContent(content: string): PostAggregate {
		this.content = content;
		return this;
	}
	withComments(commentIds: string[]): PostAggregate {
		this.comments = commentIds;
		return this;
	}
}
