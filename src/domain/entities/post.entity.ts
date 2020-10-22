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
	comments: CommentEntity[] = [];
}

export class PostEntityBuilder {
	private postEntity: PostEntity = new PostEntity();

	withId(id: string): PostEntityBuilder {
		this.postEntity.id = id;
		return this;
	}
	withClassroom(classroom: ClassroomEntity): PostEntityBuilder {
		this.postEntity.classRoom = classroom;
		return this;
	}
	withPostOwner(postOwner: UserEntity): PostEntityBuilder {
		this.postEntity.postOwner = postOwner;
		return this;
	}
	withContent(content: string): PostEntityBuilder {
		this.postEntity.content = content;
		return this;
	}
	withComments(comments: CommentEntity[]): PostEntityBuilder {
		this.postEntity.comments = comments;
		return this;
	}
	build(): PostEntity {
		return this.postEntity;
	}
}
