export class ClassroomAggregateRoot {
	classroomId: string;
	courseName: string;
	studentsId: string[];
	teacherId: string;
	teacherAssistancesId: string[];
	postsId: string[];

	withClassroomId(classroomId: string): ClassroomAggregateRoot {
		this.classroomId = classroomId;
		return this;
	}
	withCourseName(name: string): ClassroomAggregateRoot {
		this.courseName = name;
		return this;
	}
	withStudentsId(ids: string[]): ClassroomAggregateRoot {
		this.studentsId = ids;
		return this;
	}
	withTeacherId(id: string): ClassroomAggregateRoot {
		this.teacherId = id;
		return this;
	}
	withTeacherAssistancesId(ids: string[]): ClassroomAggregateRoot {
		this.teacherAssistancesId = ids;
		return this;
	}
	withPostsId(ids: string[]): ClassroomAggregateRoot {
		this.postsId = ids;
		return this;
	}
}
