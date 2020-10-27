import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { EntityRepository } from "src/domain/repositories/repository.interface";
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
        @Inject("classroom-aggregate-mapper") private classroomAggregateMapper: IAggregateMapper<ClassroomAggregateRoot>
	) {}

	public getCreateClassroomCommand(aggregate: ClassroomAggregateRoot): ICommand<ClassroomAggregateRoot> {
		this.logger.log(`courseName --> ${aggregate.courseName}`);
		return new CreateClassroomCommand()
			.withAggregate(aggregate)
			.withClassroomRepository(this.classroomRepository)
            .withUserRepository(this.userRepository)
            .withAggregateMapper(this.classroomAggregateMapper);
	}
}
