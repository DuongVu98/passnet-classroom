import { Inject, Injectable, Logger } from "@nestjs/common";
import { PostAggregate } from "../aggregate/post.aggregate";
import { UserAggregate } from "../aggregate/user.aggregate";
import { PostEntity } from "../entities/post.entity";
import { EntityRepository } from "../repositories/repository.interface";
import { IAggregateMapper } from "./aggregate.mapper";

@Injectable()
export class PostAggregateMapper implements IAggregateMapper<PostAggregate> {
	logger: Logger = new Logger("PostAggregateMapper");

	constructor(@Inject("post-repository") private postRepository: EntityRepository<PostEntity>) {}

	async toAggregate(aggregateId: string): Promise<PostAggregate> {
		return this.postRepository
			.findById(aggregateId)
			.then((postEntity) => {
				const commentsIdPromise = postEntity.comments.map((comment) => comment.id);
				return Promise.all([Promise.resolve(postEntity), commentsIdPromise]);
			})
			.then((values) => {
				const postEntity = values[0];
				return new PostAggregate()
					.withPostId(postEntity.id)
					.withContent(postEntity.content)
					.withComments(values[1])
					.withPostOwnerId(postEntity.postOwner.uid);
			});
	}
}
