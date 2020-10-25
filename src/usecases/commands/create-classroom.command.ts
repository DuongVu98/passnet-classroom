import { Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { ClassroomEntity, ClassroomEntityBuilder } from "src/domain/entities/classroom.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { ICommand } from "./command.factory";

export class CreateClassroomCommand implements ICommand {
	private logger: Logger = new Logger("CreateClassroomCommand");

	private aggregate: ClassroomAggregateRoot;
	private classroomRepository: EntityRepository<ClassroomEntity>;
	private userRepository: EntityRepository<UserEntity>;

	async execute(): Promise<void> {
		const teacherFindingPromise = this.userRepository.findById(this.aggregate.teacherId);
		const taFindingPromise = this.toEntity(this.aggregate.teacherAssistancesId);

		Promise.all([teacherFindingPromise, taFindingPromise]).then((values) => {
			this.logger.log(`courseName --> ${this.aggregate.courseName}`);

			const teacher = values[0];
			const tas = values[1];
			const newClassroom = new ClassroomEntityBuilder()
				.withCourseName(this.aggregate.courseName)
				.withTeacher(teacher)
				.withTeacherAssistances(tas)
				.build();
			tas.forEach((ta) => {
                this.logger.log(ta.uid)
				ta.taClassrooms.push(newClassroom);
				this.userRepository.updateById(ta.uid, ta);
			});

			this.classroomRepository.insert(newClassroom);
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
		this.classroomRepository = repository;
		return this;
	}
	withUserRepository(repository: EntityRepository<UserEntity>): CreateClassroomCommand {
		this.userRepository = repository;
		return this;
	}
}
