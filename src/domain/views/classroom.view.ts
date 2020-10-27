import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";
import { PostView } from "./post.view";
import { StudentView } from "./student.view";
import { TeacherView } from "./teacher.view";

export class ClassroomView {
	classroomId: string;
	courseName: string;
	students: StudentView[];
	teacher: TeacherView;
	teacherAssistances: StudentView[];
	posts: PostView[];
}

export class ClassroomViewEditor {
	constructor(private view: ClassroomView) {}

	withClassroomId(id: string): ClassroomViewEditor {
		this.view.classroomId = id;
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
