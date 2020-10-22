import { Column, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { ClassroomEntity } from "./classroom.entity";
import { CommentEntity } from "./comment.entity";
import { PostEntity } from "./post.entity";

export class UserEntity {
	@PrimaryColumn({ name: "uid" })
	uid: string;

	@Column({ name: "onlineState", type: "boolean" })
	onlineState: boolean;

	@ManyToMany(() => ClassroomEntity, (c) => c.students)
	classRooms: ClassroomEntity[];

	@OneToMany(() => ClassroomEntity, (c) => c.teacher)
	ownClassrooms: ClassroomEntity[];

	@ManyToMany(() => ClassroomEntity, (c) => c.teacherAssistances)
	taClassrooms: ClassroomEntity[];

	@OneToMany(() => PostEntity, (p) => p.postOwner)
	posts: PostEntity[];

	@OneToMany(() => CommentEntity, (c) => c.commentOwner)
	comments: CommentEntity;
}
