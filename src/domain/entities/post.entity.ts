import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClassroomEntity } from "./classroom.entity";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "posts" })
export class PostEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => ClassroomEntity, (c) => c.id)
	classRoom: ClassroomEntity;

	@ManyToOne(() => UserEntity, (u) => u.posts)
	postOwner: UserEntity;

	@Column({ name: "content", type: "text" })
	content: string;

	@OneToMany(() => CommentEntity, (c) => c.post)
	comments: CommentEntity[];
}
