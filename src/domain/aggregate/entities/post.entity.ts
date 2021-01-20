import { Content } from "../vos/content.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Comment } from "./comment.entity";
import { PostId } from "src/domain/aggregate/vos/post-id.vo";

export class Post {
	postId: PostId;
	content: Content;
	postOwner: UserId;
	comments: Comment[];

	// public static builder: PostBuilder = new PostBuilder();

	addComment(comment: Comment): void {
		this.comments.push(comment);
	}

	editContent(newContent: Content): void {
		this.content = newContent;
	}
}
