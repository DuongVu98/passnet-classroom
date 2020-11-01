import { CommentAgregate } from "src/domain/aggregate/comment.aggregate";
import { CommentEntity, CommentEntityBuilder } from "src/domain/entities/comment.entity";
import { PostEntity } from "src/domain/entities/post.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { ICommand } from "./command.factory";

export class UserAddCommentCommand implements ICommand<CommentAgregate> {
	private userRepository: EntityRepository<UserEntity>;
	private postRepository: EntityRepository<PostEntity>;
	private commentRepository: EntityRepository<CommentEntity>;
	private commentAggregateMapper: IAggregateMapper<CommentAgregate>;

	constructor(private aggregate: CommentAgregate) {}

	async execute(): Promise<CommentAgregate> {
		const findCommentOwnerPromise = this.userRepository.findById(this.aggregate.commentOwnerId);
		const findPostIdPromise = this.postRepository.findById(this.aggregate.postId);

		return Promise.all([findCommentOwnerPromise, findPostIdPromise])
			.then((values) => {
				const commentOwner = values[0];
				const post = values[1];
				const aggregateRootIdentifier = post.classRoom.id;

				const commentEntity = new CommentEntityBuilder().withCommentOwner(commentOwner).withPost(post).build();
				return Promise.all([aggregateRootIdentifier, this.commentRepository.insert(commentEntity)]);
			})
			.then((values) => {
				return Promise.all([values[0], this.commentAggregateMapper.toAggregate(values[1].id)]);
			})
			.then((values) => values[1].withAggregateRooTidentifier(values[0]));
	}

	withUserRepository(repository: EntityRepository<UserEntity>): UserAddCommentCommand {
		this.userRepository = repository;
		return this;
	}
	withPostRepository(repository: EntityRepository<PostEntity>): UserAddCommentCommand {
		this.postRepository = repository;
		return this;
	}
	withCommentRepository(repository: EntityRepository<CommentEntity>): UserAddCommentCommand {
		this.commentRepository = repository;
		return this;
	}
	withCommentAggregateMapper(mapper: IAggregateMapper<CommentAgregate>): UserAddCommentCommand {
		this.commentAggregateMapper = mapper;
		return this;
	}
}
