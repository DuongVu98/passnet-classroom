import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PostView } from "./post.view";
import { StudentView } from "./student.view";
import { TeacherView } from "./teacher.view";

@Schema()
export class ClassroomView extends Document {
	@Prop()
	classroomId: string;

	@Prop()
	courseName: string;

	@Prop()
	students: StudentView[];

	@Prop()
	teacher: TeacherView;

	@Prop()
	teacherAssistances: StudentView[];

	@Prop()
	posts: PostView[];
}
export const ClassroomViewSchema = SchemaFactory.createForClass(ClassroomView);

export class ClassroomViewDto {
	classroomId: string;
	courseName: string;
	students: StudentView[];
	teacher: TeacherView;
	teacherAssistances: StudentView[];
	posts: PostView[];
}

export class ClassroomViewDtoBuilder {
	private view: ClassroomViewDto = new ClassroomViewDto();

	withClassroomId(id: string): ClassroomViewDtoBuilder {
		this.view.classroomId = id;
		return this;
	}
	withCourseName(name: string): ClassroomViewDtoBuilder {
		this.view.courseName = name;
		return this;
	}
	withStudents(students: StudentView[]): ClassroomViewDtoBuilder {
		this.view.students = students;
		return this;
	}
	withTeacher(teacher: TeacherView): ClassroomViewDtoBuilder {
		this.view.teacher = teacher;
		return this;
	}
	withTeacherAssistances(tas: StudentView[]): ClassroomViewDtoBuilder {
		this.view.teacherAssistances = tas;
		return this;
	}
	withPosts(posts: PostView[]): ClassroomViewDtoBuilder {
		this.view.posts = posts;
		return this;
	}
	build(): ClassroomViewDto {
		return this.view;
	}
}
