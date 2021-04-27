import { EntityId } from "../aggregate.root";

export class UserId extends EntityId<string> {
	constructor(id: string) {
		super(id);
	}

	equals = (idType: EntityId<string>): boolean => {
		return this._id === idType._id;
	}
}

export class UserIdDomain {
    constructor(private userId: UserId) {
    }

    equals(otherUserId: UserId): boolean {
        return this.userId._id === otherUserId.getId;
    }

    public get getId(): UserId {
		return this.userId;
	}
}
