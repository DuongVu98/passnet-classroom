import { CommentEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";

export class PostEntity {
	postOwner: UserEntity;
	content: string;
	comments: CommentEntity[];
}
