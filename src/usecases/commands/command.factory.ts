import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAggregateMapper, IEntityMapper } from "src/domain/mappers/aggregate.mapper";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { AddStudentCommand } from "./add-student.command";
import { CreateClassroomCommand } from "./create-classroom.command";

export interface ICommand<AGGREGATE> {
	execute(): Promise<AGGREGATE>;
}

@Injectable()
export class CommandFactory {
	private logger: Logger = new Logger("CommandFactory");

	constructor(
		@Inject("classroom-repository") private classroomRepository: EntityRepository<ClassroomEntity>,
		@Inject("user-repository") private userRepository: EntityRepository<UserEntity>,
		@Inject("classroom-aggregate-mapper") private classroomAggregateMapper: IAggregateMapper<ClassroomAggregateRoot>,
		@Inject("user-aggregate-mapper") private userAggregateMapper: IAggregateMapper<UserAggregate>,
		@Inject("classroom-entity-mapper") private classroomEntityMapper: IEntityMapper<ClassroomAggregateRoot, ClassroomEntity>
	) {}

	public produceCreateClassroomCommand(aggregate: ClassroomAggregateRoot): ICommand<ClassroomAggregateRoot> {
		this.logger.log(`courseName --> ${aggregate.courseName}`);
		return new CreateClassroomCommand()
			.withAggregate(aggregate)
			.withClassroomRepository(this.classroomRepository)
			.withUserRepository(this.userRepository)
			.withAggregateMapper(this.classroomAggregateMapper);
	}

	public produceAddStudentCommand(aggregate: UserAggregate, aggregateIdentifier: string): ICommand<UserAggregate> {
		return new AddStudentCommand(aggregate, aggregateIdentifier)
			.withClassroomAggregateMapper(this.classroomAggregateMapper)
			.withClassroomRepository(this.classroomRepository)
			.withUserRepository(this.userRepository)
			.withUserAggregateMapper(this.userAggregateMapper)
			.withClassroomEntityMapper(this.classroomEntityMapper);
	}
}
