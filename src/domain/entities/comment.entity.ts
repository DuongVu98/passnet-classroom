import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

export class CommentEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => UserEntity, (u) => u.comments)
	commentOwner: UserEntity;

	@ManyToOne(() => PostEntity, (p) => p.comments)
	post: PostEntity;

	@Column({ name: "content", type: "text" })
	content: string;
}
