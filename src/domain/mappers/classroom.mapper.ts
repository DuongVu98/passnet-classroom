import { Inject, Injectable } from "@nestjs/common";
import { ENETDOWN } from "constants";
import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";
import { ClassroomEntity } from "../entities/classroom.entity";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository } from "../repositories/repository.interface";

@Injectable()
export class ClassroomMapper {
	constructor(@Inject("classroom-repository") private classroomReopsitory: EntityRepository<ClassroomEntity>, @Inject("user-repository") private userRepostiory: EntityRepository<UserEntity>) {}

	async toAggregate(entity: ClassroomEntity): Promise<ClassroomAggregateRoot> {
        const aggregate = new ClassroomAggregateRoot() 
        const postIdsPromise = entity.posts.map(post => post.id)
        const studentIdsPromise = entity.students.map(student => student.uid)
        const taIdsPromise = entity.teacherAssistances.map(ta => ta.uid)

        await Promise.all([postIdsPromise, studentIdsPromise, taIdsPromise]).then(values => {
            aggregate
                .withClassroomId(entity.id)
                .withCourseName(entity.courseName)
                .withPostsId(values[0])
                .withStudentsId(values[1])
                .withTeacherAssistancesId(values[2])
                .withTeacherId(entity.teacher.uid);
        })

        return aggregate;
    }
    
    
}
