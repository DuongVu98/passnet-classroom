export class PostAggregate {
	postId: string;
	content: string;
	comments: string[];

	withPostId(id: string): PostAggregate {
		this.postId = id;
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
