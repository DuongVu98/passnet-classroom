import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Entity } from "./aggregate.root";
import { Post } from "./entities/post.entity";
import { ClassroomId } from "./vos/classroom-id.vo";
import { CourseName } from "./vos/course-name.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import {Comment} from "./entities/comment.entity";

@Schema()
export class ClassroomAggregateRoot extends Entity {
    @Prop({name: "classroom_id"})
    id: ClassroomId;

    @Prop({name: "course_name"})
    courseName: CourseName;

    @Prop({name: "students"})
    students: UserId[];

    @Prop({name: "teacher_id"})
    teacherId: UserId;

    @Prop({name: "teacher_assistance_list"})
    teacherAssistanceList: UserId[];

    @Prop({name: "posts"})
	posts: Post[];

	public addPost(post: Post): void {
		this.posts.push(post);
	}

	public addCommentToPost(comment: Comment, post: Post): void {
		this.posts.map((currentPost) => {
			if (currentPost.postId.equals(post.postId)) {
				currentPost.addComment(comment);
			}
			return currentPost;
		});
	}

	public addStudentToClass(student: UserId): void {
		this.students.push(student);
	}
}

export const ClassroomSchema = SchemaFactory.createForClass(ClassroomAggregateRoot);
