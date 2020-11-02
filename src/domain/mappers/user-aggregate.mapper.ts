import { Inject, Injectable, Logger } from "@nestjs/common";
import { UserAggregate } from "../aggregate/user.aggregate";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository } from "../repositories/repository.interface";
import { IAggregateMapper } from "./aggregate.mapper";

@Injectable()
export class UserAggregateMapper implements IAggregateMapper<UserAggregate> {
	logger: Logger = new Logger("UserAggregateMapper");

	constructor(@Inject("user-repository") private userRepository: EntityRepository<UserEntity>) {}

	async toAggregate(aggregateId: string): Promise<UserAggregate> {
		const aggregate = new UserAggregate();

		await this.userRepository
			.findById(aggregateId)
			.then((userEntity) => {
				this.logger.debug(`user findById ${aggregateId} --> ${JSON.stringify(userEntity)}`);
				aggregate.withUid(userEntity.uid).withOnlineState(userEntity.onlineState);
			})
			.catch((error) => {
				this.logger.error(`error in toAggregate() --> ${error}`);
			});

		return aggregate;
	}
}
