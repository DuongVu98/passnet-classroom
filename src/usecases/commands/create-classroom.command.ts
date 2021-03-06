import { Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { ClassroomEntity, ClassroomEntityBuilder } from "src/domain/entities/classroom.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { ICommand } from "./command.factory";

export class CreateClassroomCommand implements ICommand<ClassroomAggregateRoot> {
	private logger: Logger = new Logger("CreateClassroomCommand");

	private aggregate: ClassroomAggregateRoot;
	private classroomRepository: EntityRepository<ClassroomEntity>;
	private userRepository: EntityRepository<UserEntity>;
	private aggregateMapper: IAggregateMapper<ClassroomAggregateRoot>;

	async execute(): Promise<ClassroomAggregateRoot> {
		let aggregateToReturn = new ClassroomAggregateRoot();

		const teacherFindingPromise = this.userRepository.findById(this.aggregate.teacherId);
		const taFindingPromise = this.toEntity(this.aggregate.teacherAssistancesId);

		await Promise.all([teacherFindingPromise, taFindingPromise])
			.then((values) => {
				const teacher = values[0];
				const tas = values[1];

				const newClassroom = new ClassroomEntityBuilder()
					.withCourseName(this.aggregate.courseName)
					.withTeacher(teacher)
					.withTeacherAssistances(tas)
					.build();

				return this.classroomRepository.insert(newClassroom);
			})
			.then((entity) => {
				return this.aggregateMapper.toAggregate(entity.id);
			})
			.then((aggregate) => {
				aggregateToReturn = aggregate;
			});

		return aggregateToReturn;
	}

	async toEntity(ids: string[]): Promise<UserEntity[]> {
		let userList: UserEntity[] = [];
		const allIdFindingPromises = ids.map((id) => this.userRepository.findById(id));
		await Promise.all(allIdFindingPromises).then((users) => {
			userList = users;
		});
		return userList;
	}

	withAggregate(aggregate: ClassroomAggregateRoot): CreateClassroomCommand {
		this.aggregate = aggregate;
		return this;
	}
	withClassroomRepository(repository: EntityRepository<ClassroomEntity>): CreateClassroomCommand {
		this.classroomRepository = repository;
		return this;
	}
	withUserRepository(repository: EntityRepository<UserEntity>): CreateClassroomCommand {
		this.userRepository = repository;
		return this;
	}
	withAggregateMapper(mapper: IAggregateMapper<ClassroomAggregateRoot>): CreateClassroomCommand {
		this.aggregateMapper = mapper;
		return this;
	}
}
