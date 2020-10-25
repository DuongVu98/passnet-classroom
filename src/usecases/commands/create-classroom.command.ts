import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { ClassroomEntity, ClassroomEntityBuilder } from "src/domain/entities/classroom.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { ICommand } from "./command.factory";

export class CreateClassroomCommand implements ICommand{
	private aggregate: ClassroomAggregateRoot;
	private classroomRepsitory: EntityRepository<ClassroomEntity>;
	private userRepository: EntityRepository<UserEntity>;

	async execute(): Promise<void> {
		const teacherFindingPromise = this.userRepository.findById(this.aggregate.teacherId);
		const taFindingPromise = this.toEntity(this.aggregate.teacherAssistancesId);

		Promise.all([teacherFindingPromise, taFindingPromise]).then((values) => {
			const newClassroom = new ClassroomEntityBuilder()
				.withCourseName(this.aggregate.courseName)
				.withTeacher(values[0])
				.withTeacherAssistances(values[1])
				.build();

			this.classroomRepsitory.insert(newClassroom);
		});
	}

	async toEntity(ids: string[]): Promise<UserEntity[]> {
		const userList: UserEntity[] = [];
		await ids.forEach((id) => {
			this.userRepository.findById(id).then((userEntity) => {
				userList.push(userEntity);
			});
		});
		return userList;
	}

	withAggregate(aggregate: ClassroomAggregateRoot): CreateClassroomCommand {
		this.aggregate = aggregate;
		return this;
	}
	withClassroomRepository(repository: EntityRepository<ClassroomEntity>): CreateClassroomCommand {
		this.classroomRepsitory = repository;
		return this;
	}
}
