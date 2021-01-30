import { CommentId } from "../vos/comment-id.vo";
import { Content } from "../vos/content.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";

export class Comment {
	commentId: CommentId;
	content: Content;
	commentOwner: UserId;
}
