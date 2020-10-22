import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "comments" })
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

export class CommentEntityBuilder {
    private commentEntity: CommentEntity = new CommentEntity();

    withId(id: string): CommentEntityBuilder {
        this.commentEntity.id = id;
        return this;
    }
    withCommentOwner(commentOwner: UserEntity): CommentEntityBuilder {
        this.commentEntity.commentOwner = commentOwner;
        return this;
    }
    withPost(post: PostEntity): CommentEntityBuilder {
        this.commentEntity.post = post;
        return this;
    }
    withContent(content: string): CommentEntityBuilder {
        this.commentEntity.content = content;
        return this;
    }
    build(): CommentEntity {
        return this.commentEntity;
    }
}
