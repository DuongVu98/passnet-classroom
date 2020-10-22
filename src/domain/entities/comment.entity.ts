import { UserEntity } from "./user.entity";

export class CommentEntity {
	commentOwner: UserEntity;
	content: string;
}
