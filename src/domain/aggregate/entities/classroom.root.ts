import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Post, PostDomainFunction } from "./post.entity";
import { Comment } from "./comment.entity";
import { ClassCode, ClassroomId, CourseName, Job, OrganizationId } from "../vos/value-objects";
import { Member } from "./member.entity";

export type ClassroomDocument = Classroom & mongoose.Document;

@Schema()
export class Classroom {
	@Prop({ required: true, unique: true })
	classroomId: ClassroomId;

	@Prop()
	courseName: CourseName;

	@Prop()
	students: Member[];

	@Prop()
	lecturer: Member;

	@Prop()
	assistants: Member[];

	@Prop()
	members: Member[];

	@Prop()
	posts: Post[];

	@Prop()
	jobId: Job;

	@Prop()
	classCode: ClassCode;

	@Prop()
	organizationId: OrganizationId;
}

export class ClassroomDomainFunctions {
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

	public addStudentToClass(student: Member): Classroom {
		this._aggregate.members.push(student);
		return this._aggregate;
	}

	get aggregate(): Classroom {
		return this._aggregate;
	}
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
