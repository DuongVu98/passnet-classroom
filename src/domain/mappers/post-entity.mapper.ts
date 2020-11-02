import { PostAggregate } from "../aggregate/post.aggregate";
import { PostEntity, PostEntityBuilder } from "../entities/post.entity";
import { IEntityMapper } from "./aggregate.mapper";

export class PostEnityMapper implements IEntityMapper<PostAggregate, PostEntity> {
	toEntity(aggregate: PostAggregate): Promise<PostEntity> {
		return null;
	}
}
