import { Injectable } from "@nestjs/common";
import { UserAggregate } from "../aggregate/user.aggregate";
import { UserEntity, UserEntityBuilder } from "../entities/user.entity";
import { IEntityMapper } from "./aggregate.mapper";

@Injectable()
export class UserEntityMapper implements IEntityMapper<UserAggregate, UserEntity> {
	async toEntity(aggregate: UserAggregate): Promise<UserEntity> {
		return new UserEntityBuilder().withUid(aggregate.uid).withOnlineState(aggregate.isOnlineState).build();
	}
}
