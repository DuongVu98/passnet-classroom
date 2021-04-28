import { Injectable, Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { User } from "src/domain/aggregate-sql/value-objects";
import { ClassroomRepository } from "src/domain/repositories-sql/aggregate.repository";
import { ClassroomLiteView } from "src/domain/views/views";

@Injectable()
export class Projector {
    
	logger: Logger = new Logger("ViewProjector");

    constructor(private aggregateRepository: ClassroomRepository) {}
    
    getClassroomListByMemberType = (memberType: string, uid: string): Promise<ClassroomLiteView[]> => {
		switch (memberType) {
			// case "student":
			// 	return this.getClassroomListByStudent(uid);
			// case "teacherAssistance":
			// 	return this.getClassroomListByTeacherAssistance(uid);
			case "teacher":
				return this.getClassroomListByTeacher(uid);
		}
	}

    private getClassroomListByTeacher = (uid: string): Promise<ClassroomLiteView[]> => {
		return this.aggregateRepository.findAll().then((classroomList) => {
			return classroomList
                .filter((classroom) => classroom.teacher === new User(uid))
				.map((classroom) =>
					Builder(ClassroomLiteView).classroomId(classroom.id).courseName(classroom.courseName.value).build()
				);
		});
	}
} 