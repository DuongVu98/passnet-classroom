import { Inject, Injectable } from "@nestjs/common";
import { PostAggregate } from "../aggregate/post.aggregate";
import { PostEntity } from "../entities/post.entity";
import { EntityRepository } from "../repositories/repository.interface";
import { IAggregateMapper } from "./aggregate.mapper";

@Injectable()
export class PostAggregateMapper implements IAggregateMapper<PostAggregate> {
	constructor(@Inject("post-repository") private postRepository: EntityRepository<PostEntity>) {}

	async toAggregate(aggregateId: string): Promise<PostAggregate> {
		const aggregate = new PostAggregate();

		await this.postRepository
			.findById(aggregateId)
			.then((postEntity) => {
				const commentsIdPromise = postEntity.comments.map((comment) => comment.id);

				return Promise.all([Promise.resolve(postEntity), commentsIdPromise]);
			})
			.then((values) => {
				const postEntity = values[0];
				aggregate.withPostId(postEntity.id).withContent(postEntity.content).withComments(values[1]);
			});

		return aggregate;
	}
}
