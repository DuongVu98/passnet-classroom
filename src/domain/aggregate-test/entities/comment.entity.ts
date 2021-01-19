import { Entity } from "../aggregate.root";
import { CommentId } from "../vos/comment-id.vo";
import { Content } from "../vos/content.vo";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

export class Comment extends Entity {
	commentId: CommentId;
	content: Content;
	commentOwner: Student | Teacher;
}
