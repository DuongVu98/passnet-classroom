import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Entity } from "./aggregate.root";
import { Post, PostDomainFunction } from "./entities/post.entity";
import { ClassroomId } from "./vos/classroom-id.vo";
import { CourseName } from "./vos/course-name.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { Comment } from "./entities/comment.entity";
import * as mongoose from "mongoose";
import { JobId } from "./vos/job-id.vo";

export type ClassroomDocument = Classroom & mongoose.Document;

@Schema()
export class Classroom extends Entity {
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

	@Prop()
	jobId: JobId;
}

export class ClassroomAggregateDomain {
	constructor(private _aggregate: Classroom) {}

	public addPost(post: Post): Classroom {
		this._aggregate.posts.push(post);
		return this._aggregate;
	}

	public addCommentToPost(comment: Comment, post: Post): Classroom {
		this._aggregate.posts.map((currentPost) => {
			if (currentPost.postId === post.postId) {
				currentPost = new PostDomainFunction(currentPost).addComment(comment);
			}
			return currentPost;
		});
		return this._aggregate;
	}

	public addStudentToClass(student: UserId): Classroom {
		this._aggregate.students.push(student);
		return this._aggregate;
	}

	get aggregate(): Classroom {
		return this._aggregate;
	}
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
