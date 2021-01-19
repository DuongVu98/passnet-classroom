import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Entity } from "./aggregate.root";
import { Post } from "./entities/post.entity";
import { Student } from "./entities/student.entity";
import { Teacher } from "./entities/teacher.entity";
import { ClassroomId } from "./vos/classroom-id.vo";
import { CourseName } from "./vos/course-name.vo";

@Schema()
export class ClassroomAggregateRoot extends Entity {
    @Prop({name: "classroom_id"})
    id: ClassroomId;

    @Prop({name: "course_name"})
    courseName: CourseName;

    @Prop({name: "students"})
    students: Student[];

    @Prop({name: "teacher_id"})
    teacherId: Teacher;

    @Prop({name: "teacher_assistances"})
    teacherAssistances: Student[];

    @Prop({name: "posts"})
	posts: Post[];

	public addPost(post: Post): void {
		this.posts.push(post);
	}

	public addCommentToPost(comment: Comment, post: Post): void {
		this.posts.map((currentPost) => {
			if (currentPost.equals(post)) {
				currentPost.addComment(comment);
			}
			return currentPost;
		});
	}

	public addStudentToClass(student: Student): void {
		this.students.push(student);
	}
}

export const ClassroomSchema = SchemaFactory.createForClass(ClassroomAggregateRoot);
