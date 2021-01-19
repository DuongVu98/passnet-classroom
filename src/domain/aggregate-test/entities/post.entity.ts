import { Entity } from "../aggregate.root";
import { Content } from "../vos/content.vo";
import { PostId } from "../vos/post-id.vo";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

export class Post extends Entity {
	postId: PostId;
	content: Content;
	postOwner: Student | Teacher;
	comments: Comment[];

	addComment(comment: Comment): void {
		this.comments.push(comment);
	}

	editContent(newContent: Content): void {
		this.content = newContent;
	}
}
