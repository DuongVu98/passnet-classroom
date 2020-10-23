import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "classrooms" })
export class ClassroomEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "text", name: "course_name" })
	courseName: string;

	@ManyToMany(() => UserEntity)
	@JoinTable({ name: "classroom_student" })
	students: UserEntity[];

	@ManyToOne(() => UserEntity, (u) => u.ownClassrooms)
	teacher: UserEntity;

	@ManyToMany(() => UserEntity)
	@JoinTable({ name: "classroom_ta" })
	teacherAssistances: UserEntity[];

	@OneToMany(() => PostEntity, (p) => p.classRoom)
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
