import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { ClassroomEntity } from "./classroom.entity";
import { CommentEntity } from "./comment.entity";
import { PostEntity } from "./post.entity";

@Entity({ name: "users" })
export class UserEntity {
	@PrimaryColumn({ name: "uid" })
	uid: string;

	@Column({ name: "onlineState", type: "boolean" })
	onlineState: boolean;

	@ManyToMany(() => ClassroomEntity, (c) => c.students)
	classRooms: ClassroomEntity[] = [];

	@OneToMany(() => ClassroomEntity, (c) => c.teacher)
	ownClassrooms: ClassroomEntity[] = [];

	@ManyToMany(() => ClassroomEntity, (c) => c.teacherAssistances)
	taClassrooms: ClassroomEntity[] = [];

	@OneToMany(() => PostEntity, (p) => p.postOwner)
	posts: PostEntity[] = [];

	@OneToMany(() => CommentEntity, (c) => c.commentOwner)
	comments: CommentEntity[] = [];
}

export class UserEntityBuilder {
    private userEntity: UserEntity = new UserEntity();

    withUid(uid: string): UserEntityBuilder {
        this.userEntity.uid = uid;
        return this;
    }
    withOnlineState(state: boolean): UserEntityBuilder{
        this.userEntity.onlineState = state;
        return this;
    }
    withClassrooms(classrooms: ClassroomEntity[]): UserEntityBuilder {
        this.userEntity.classRooms = classrooms;
        return this;
    }
    withOwnClassrooms(ownClassrooms: ClassroomEntity[]): UserEntityBuilder {
        this.userEntity.ownClassrooms = ownClassrooms;
        return this;
    }
    withTaClassrooms(taClassrooms: ClassroomEntity[]): UserEntityBuilder {
        this.userEntity.taClassrooms = taClassrooms;
        return this;
    }
    withPosts(posts: PostEntity[]): UserEntityBuilder {
        this.userEntity.posts = posts;
        return this;
    }
    withComments(comments: CommentEntity[]): UserEntityBuilder {
        this.userEntity.comments = comments;
        return this;
    }
    build(): UserEntity {
        return this.userEntity;
    }
}
