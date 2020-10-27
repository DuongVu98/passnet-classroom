import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { PostView } from "./post.view";
import { StudentView } from "./student.view";
import { TeacherView } from "./teacher.view";

@Schema()
export class ClassroomView extends Document {
	classroomId: string;
	courseName: string;
	students: StudentView[];
	teacher: TeacherView;
	teacherAssistances: StudentView[];
	posts: PostView[];
}

export const ClassroomViewSchema = SchemaFactory.createForClass(ClassroomView);

export class ClassroomViewEditor {
	constructor(private view: ClassroomView) {}

	withClassroomId(id: string): ClassroomViewEditor {
		this.view.classroomId = id;
		this.view._id = id;
		return this;
	}
	withCourseName(name: string): ClassroomViewEditor {
		this.view.courseName = name;
		return this;
	}
	withStudents(students: StudentView[]): ClassroomViewEditor {
		this.view.students = students;
		return this;
	}
	withTeacher(teacher: TeacherView): ClassroomViewEditor {
		this.view.teacher = teacher;
		return this;
	}
	withTeacherAssistances(tas: StudentView[]): ClassroomViewEditor {
		this.view.teacherAssistances = tas;
		return this;
	}
	withPosts(posts: PostView[]): ClassroomViewEditor {
		this.view.posts = posts;
		return this;
	}
	build(): ClassroomView {
		return this.view;
	}
}

export class ClassroomViewBuilder {
    private view: ClassroomView = new ClassroomView();
    
	withClassroomId(id: string): ClassroomViewBuilder {
		this.view.classroomId = id;
		this.view._id = id;
		return this;
	}
	withCourseName(name: string): ClassroomViewBuilder {
		this.view.courseName = name;
		return this;
	}
	withStudents(students: StudentView[]): ClassroomViewBuilder {
		this.view.students = students;
		return this;
	}
	withTeacher(teacher: TeacherView): ClassroomViewBuilder {
		this.view.teacher = teacher;
		return this;
	}
	withTeacherAssistances(tas: StudentView[]): ClassroomViewBuilder {
		this.view.teacherAssistances = tas;
		return this;
	}
	withPosts(posts: PostView[]): ClassroomViewBuilder {
		this.view.posts = posts;
		return this;
	}
	build(): ClassroomView {
		return this.view;
	}
}
