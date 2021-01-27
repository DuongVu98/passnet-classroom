import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Entity } from "./aggregate.root";
import { Post } from "./entities/post.entity";
import { ClassroomId } from "./vos/classroom-id.vo";
import { CourseName } from "./vos/course-name.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Comment } from "./entities/comment.entity";
import * as mongoose from "mongoose";

export type ClassroomAggregateDocument = ClassroomAggregateRoot & mongoose.Document;

@Schema()
export class ClassroomAggregateRoot extends Entity {
	@Prop({ type: mongoose.Types.ObjectId })
	id: ClassroomId;

	@Prop()
	courseName: CourseName;

	@Prop()
	students: UserId[];

	@Prop()
	teacherId: UserId;

	@Prop()
	teacherAssistanceList: UserId[];

	@Prop()
	posts: Post[];
}

export class ClassroomAggregateDomain {
	constructor(private _aggregate: ClassroomAggregateRoot) {}

	public addPost(post: Post): ClassroomAggregateRoot {
		this._aggregate.posts.push(post);
		return this._aggregate;
	}

	public addCommentToPost(comment: Comment, post: Post): ClassroomAggregateRoot {
		this._aggregate.posts.map((currentPost) => {
			if (currentPost.postId.equals(post.postId)) {
				currentPost.addComment(comment);
			}
			return currentPost;
		});
		return this._aggregate;
	}

	public addStudentToClass(student: UserId): ClassroomAggregateRoot {
		this._aggregate.students.push(student);
		return this._aggregate;
	}

	get aggregate(): ClassroomAggregateRoot {
		return this._aggregate;
	}
}

export const ClassroomSchema = SchemaFactory.createForClass(ClassroomAggregateRoot);
