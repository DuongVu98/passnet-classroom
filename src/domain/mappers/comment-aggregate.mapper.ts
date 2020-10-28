import { Inject, Injectable } from "@nestjs/common";
import { CommentAgregate } from "../aggregate/comment.aggregate";
import { CommentEntity } from "../entities/comment.entity";
import { EntityRepository } from "../repositories/repository.interface";
import { IAggregateMapper } from "./aggregate.mapper";

@Injectable()
export class CommentAggregateMapper implements IAggregateMapper<CommentAgregate> {
	constructor(@Inject("comment-repository") private commentRepository: EntityRepository<CommentEntity>) {}

	async toAggregate(aggregateId: string): Promise<CommentAgregate> {
		const aggregate: CommentAgregate = new CommentAgregate();

		await this.commentRepository.findById(aggregateId).then((commentEntity) => {
			aggregate.withCommentId(commentEntity.id).withContent(commentEntity.content);
		});
		return aggregate;
	}
}
