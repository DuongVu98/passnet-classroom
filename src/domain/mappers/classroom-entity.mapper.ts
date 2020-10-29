import { Inject, Injectable } from "@nestjs/common";
import { ClassroomAggregateRoot } from "../aggregate/classroom.aggregate";
import { ClassroomEntity, ClassroomEntityBuilder } from "../entities/classroom.entity";
import { PostEntity } from "../entities/post.entity";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository } from "../repositories/repository.interface";
import { IEntityMapper } from "./aggregate.mapper";

@Injectable()
export class ClassroomEntityMapper implements IEntityMapper<ClassroomAggregateRoot, ClassroomEntity> {
	constructor(
		@Inject("user-repository") private userRepository: EntityRepository<UserEntity>,
		@Inject("post-repository") private postRepository: EntityRepository<PostEntity>
	) {}

	async toEntity(aggregate: ClassroomAggregateRoot): Promise<ClassroomEntity> {
		const classroomEntityBuilder = new ClassroomEntityBuilder().withCourseName(aggregate.courseName).withId(aggregate.classroomId);

		const teacherPromise = this.userRepository.findById(aggregate.classroomId);
		const studentsPromises = aggregate.studentsId.map((id) => this.userRepository.findById(id));
		const postsPromises = aggregate.postsId.map((id) => this.postRepository.findById(id));
		const tasPromises = aggregate.teacherAssistancesId.map((id) => this.userRepository.findById(id));

		await Promise.all([teacherPromise, studentsPromises, postsPromises, tasPromises]).then(async (values) => {
			const teacher = values[0];
			const studentsPromises = values[1];
			const postsPromises = values[2];
			const tasPromises = values[3];

			await classroomEntityBuilder.withTeacher(teacher);

			await Promise.all(studentsPromises).then((students) => {
				classroomEntityBuilder.withStudents(students);
			});
			await Promise.all(postsPromises).then((posts) => {
				classroomEntityBuilder.withPosts(posts);
			});
			await Promise.all(tasPromises).then((tas) => {
				classroomEntityBuilder.withTeacherAssistances(tas);
			});
		});

		return classroomEntityBuilder.build();
	}
}
