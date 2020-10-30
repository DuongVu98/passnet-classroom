import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { PostAggregate } from "src/domain/aggregate/post.aggregate";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { PostEntity } from "src/domain/entities/post.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAggregateMapper, IEntityMapper } from "src/domain/mappers/aggregate.mapper";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { AddStudentCommand } from "./add-student.command";
import { CreateClassroomCommand } from "./create-classroom.command";
import { StudentCreatePostCommand } from "./student-create-post.command";

export interface ICommand<AGGREGATE> {
	execute(): Promise<AGGREGATE>;
}

@Injectable()
export class CommandFactory {
	private logger: Logger = new Logger("CommandFactory");

	constructor(
		@Inject("classroom-repository") private classroomRepository: EntityRepository<ClassroomEntity>,
        @Inject("user-repository") private userRepository: EntityRepository<UserEntity>,
        @Inject("post-repository") private postRepository: EntityRepository<PostEntity>,
		@Inject("classroom-aggregate-mapper") private classroomAggregateMapper: IAggregateMapper<ClassroomAggregateRoot>,
        @Inject("user-aggregate-mapper") private userAggregateMapper: IAggregateMapper<UserAggregate>,
        @Inject("post-aggregate-mapper") private postAggregateMapper: IAggregateMapper<PostAggregate>,
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
    
    public produceStudentCreatePostCommand(aggregate: PostAggregate, aggregateIdentifier: string): ICommand<PostAggregate> {
        return new StudentCreatePostCommand(aggregate, aggregateIdentifier)
            .withClassroomRepository(this.classroomRepository)
            .withUserRepository(this.userRepository)
            .withPostRepository(this.postRepository)
            .withPostAggregateMapper(this.postAggregateMapper)
    }
}
