import { CommentId, Content } from "../vos/value-objects";
import { Member } from "./member.entity";

export class Comment {
	commentId: CommentId;
	content: Content;
	owner: Member;
}
