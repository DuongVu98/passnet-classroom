import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

export class ClassroomEntity {
	id: string;
	courseName: string;
	students: UserEntity[];
	teacher: UserEntity;
	teacherAssistances: UserEntity[];
	posts: PostEntity[];
}

export class ClassroomEntityBuilder {
	classroomEntity: ClassroomEntity;

	public withId(id: string): ClassroomEntityBuilder {
		this.classroomEntity.id = id;
		return this;
	}
	public withCourseName(courseName: string): ClassroomEntityBuilder {
		this.classroomEntity.courseName = courseName;
		return this;
	}
	public withStudents(students: UserEntity[]): ClassroomEntityBuilder {
		this.classroomEntity.students = students;
		return this;
	}
	public withTeacher(teacher: UserEntity): ClassroomEntityBuilder {
		this.classroomEntity.teacher = teacher;
		return this;
	}
	public withTeacherAssistances(tas: UserEntity[]): ClassroomEntityBuilder {
		this.classroomEntity.teacherAssistances = tas;
		return this;
	}
	public withPosts(posts: PostEntity[]): ClassroomEntityBuilder {
		this.classroomEntity.posts = posts;
		return this;
	}
	public build(): ClassroomEntity {
		return this.classroomEntity;
	}
}
