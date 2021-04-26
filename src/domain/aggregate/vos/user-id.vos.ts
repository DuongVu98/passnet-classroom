import { EntityId } from "../aggregate.root";

// export class UserId extends EntityId<string> {
// 	constructor(id: string) {
// 		super(id);
// 	}

// 	equals = (idType: EntityId<string>): boolean => {
// 		return this._id === idType._id;
// 	}
// }

export class UserId {
	_id: string;

	constructor(id: string) {
        this._id = id;
	}
	equals(idType: UserId): boolean {
		return this._id === idType._id;
	};

    public get getId(): string {
		return this._id;
	}
}
