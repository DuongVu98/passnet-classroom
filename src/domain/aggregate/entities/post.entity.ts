import { Content, PostId } from "../vos/value-objects";
import { Comment } from "./comment.entity";
import { Member } from "./member.entity";

export class Post {
	postId: PostId;
	content: Content;
	owner: Member;
	comments: Comment[];
}

export class PostDomainFunction {
	constructor(private post: Post) {}

	addComment(comment: Comment): Post {
		this.post.comments.push(comment);
		return this.post;
	}

	editContent(newContent: Content): Post {
		this.post.content = newContent;
		return this.post;
	}
}
