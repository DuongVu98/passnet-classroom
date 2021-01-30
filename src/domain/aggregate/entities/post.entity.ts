import { Content } from "../vos/content.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Comment } from "./comment.entity";
import { PostId } from "src/domain/aggregate/vos/post-id.vo";

export class Post {
	postId: PostId;
	content: Content;
	postOwner: UserId;
	comments: Comment[];
}

export class PostDomainFunction {
	constructor(private post: Post) {

	}

	addComment(comment: Comment): Post {
		this.post.comments.push(comment);
		return this.post
	}

	editContent(newContent: Content): Post {
		this.post.content = newContent;
		return this.post;
	}
}
