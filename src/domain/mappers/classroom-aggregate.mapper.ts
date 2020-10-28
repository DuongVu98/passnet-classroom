import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";
import { ClassroomEntity } from "../entities/classroom.entity";
import { EntityRepository } from "../repositories/repository.interface";
import { IAggregateMapper } from "./aggregate.mapper";

@Injectable()
export class ClassroomAggregateMapper implements IAggregateMapper<ClassroomAggregateRoot> {
	readonly logger: Logger = new Logger("ClassroomAggregateMapper");

	constructor(@Inject("classroom-repository") private classroomRepository: EntityRepository<ClassroomEntity>) {}

	async toAggregate(aggregateId: string): Promise<ClassroomAggregateRoot> {
		const aggregate = new ClassroomAggregateRoot();

		await this.classroomRepository
			.findById(aggregateId)
			.then((classroomEntity) => {
				const postIdsPromise = classroomEntity.posts.map((post) => post.id);
				const studentIdsPromise = classroomEntity.students.map((student) => student.uid);
				const taIdsPromise = classroomEntity.teacherAssistances.map((ta) => ta.uid);

				return Promise.all([postIdsPromise, studentIdsPromise, taIdsPromise, Promise.resolve(classroomEntity)]);
			})
			.then((values) => {
				const classroomEntity = values[3];
				aggregate
					.withClassroomId(classroomEntity.id)
					.withCourseName(classroomEntity.courseName)
					.withPostsId(values[0])
					.withStudentsId(values[1])
					.withTeacherAssistancesId(values[2])
					.withTeacherId(classroomEntity.teacher.uid);
			})
			.catch((error) => {
				this.logger.log(`promise rejection in toAggregate() --> ${error}`);
			});

		return aggregate;
	}
}
