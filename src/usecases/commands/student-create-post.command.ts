import { HttpException, Logger } from "@nestjs/common";
import e from "express";
import { PostAggregate } from "src/domain/aggregate/post.aggregate";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { PostEntity, PostEntityBuilder } from "src/domain/entities/post.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { ICommand } from "./command.factory";

export class StudentCreatePostCommand implements ICommand<PostAggregate> {
	logger: Logger = new Logger("StudentCreatePostCommand");

	private postRepository: EntityRepository<PostEntity>;
	private userRepository: EntityRepository<UserEntity>;
	private classroomRepository: EntityRepository<ClassroomEntity>;
	private postAggregateMapper: IAggregateMapper<PostAggregate>;

	constructor(private aggregate: PostAggregate, private aggregateRootIdentifier: string) {}

	async execute(): Promise<PostAggregate> {
		const findPostOwnerPromise = this.userRepository.findById(this.aggregate.postOwnerId);
		const findClassroomPromise = this.classroomRepository.findById(this.aggregateRootIdentifier);

		return Promise.all([findPostOwnerPromise, findClassroomPromise])
			.then((values) => {
				const postOwner = values[0];
				const classroom = values[1];

				return new PostEntityBuilder()
					.withContent(this.aggregate.content)
					.withClassroom(classroom)
					.withPostOwner(postOwner)
					.withComments([])
					.build();
			})
			.then((entity) => this.postRepository.insert(entity))
			.then((insertedEntity) => this.postAggregateMapper.toAggregate(insertedEntity.id))
			.catch((error) => Promise.reject(error));
	}

	withPostRepository(repository: EntityRepository<PostEntity>): StudentCreatePostCommand {
		this.postRepository = repository;
		return this;
	}
	withUserRepository(repository: EntityRepository<UserEntity>): StudentCreatePostCommand {
		this.userRepository = repository;
		return this;
	}
	withClassroomRepository(repository: EntityRepository<ClassroomEntity>): StudentCreatePostCommand {
		this.classroomRepository = repository;
		return this;
	}
	withPostAggregateMapper(mapper: IAggregateMapper<PostAggregate>): StudentCreatePostCommand {
		this.postAggregateMapper = mapper;
		return this;
	}
}
