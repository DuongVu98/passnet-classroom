import { Logger } from "@nestjs/common";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { UserEntity, UserEntityBuilder } from "src/domain/entities/user.entity";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { ICommand } from "./command.factory";

export class AddStudentCommand implements ICommand<UserAggregate> {
	logger: Logger = new Logger("AddStudentCommand");

	private userAggregateMapper: IAggregateMapper<UserAggregate>;
	private classroomRepository: EntityRepository<ClassroomEntity>;
	private userRepository: EntityRepository<UserEntity>;

	constructor(private studentToAdd: UserAggregate, private aggregateIdentifier: string) {}

	async execute(): Promise<UserAggregate> {
		let aggregateToReturn: UserAggregate = null;

		await this.userRepository
			.findById(this.studentToAdd.uid)
			.then(async (student) => {
				if (student) {
					await this.addAvailableStudent(student);
				} else {
					await this.addUnAvailbleStudent();
				}
			})
			.catch((error) => {
				this.logger.error(`error when add student --> ${error}`);
			});

		await this.userAggregateMapper
			.toAggregate(this.studentToAdd.uid)
			.then((aggregate) => {
				this.logger.debug(`aggregate after load --> ${JSON.stringify(aggregate)}`);
				aggregateToReturn = aggregate;
			})
			.catch((error) => {
				this.logger.error(`error when load aggregate in execute() --> ${error}`);
			});

		this.logger.log("it's time to return!");
		return aggregateToReturn;
	}

	async addAvailableStudent(student: UserEntity): Promise<void> {
		this.logger.log("available");
		await this.classroomRepository
			.findById(this.aggregateIdentifier)
			.then(async (classroom) => {
				this.logger.debug(`classroom found --> ${JSON.stringify(classroom)}`);

				await classroom.students.push(student);
				try {
					this.classroomRepository.updateById(classroom.id, classroom);
				} catch (e) {
					this.logger.error(`error when update by repository --> ${e}`);
					this.logger.error(e.stack);
				}
			})
			.catch((error) => {
				this.logger.log(`error when update student in addAvailableStudent() --> ${error}`);
			});

		this.logger.log("after addAvailableStudent()");
	}

	async addUnAvailbleStudent(): Promise<void> {
		this.logger.log("unavailable");
		const newStudent = new UserEntityBuilder().withUid(this.studentToAdd.uid).withOnlineState(this.studentToAdd.isOnlineState).build();
		this.logger.warn(`before insert newStudent --> ${JSON.stringify(newStudent)}`);
		await this.classroomRepository.findById(this.aggregateIdentifier).then(async (classroom) => {
			await newStudent.classRooms.push(classroom);
			await this.userRepository.insert(newStudent);
			this.logger.warn(`after insert newStudent --> ${JSON.stringify(newStudent)}`);
		});
	}

	withUserAggregateMapper(mapper: IAggregateMapper<UserAggregate>): AddStudentCommand {
		this.userAggregateMapper = mapper;
		return this;
	}
	withClassroomRepository(repository: EntityRepository<ClassroomEntity>): AddStudentCommand {
		this.classroomRepository = repository;
		return this;
	}
	withUserRepository(repository: EntityRepository<UserEntity>): AddStudentCommand {
		this.userRepository = repository;
		return this;
	}
}
