import { EntityId } from "../aggregate.root";

export class UserId extends EntityId<string> {
	constructor(id: string) {
		super(id);
	}

	equals(idType: EntityId<string>): boolean {
		return this.id === idType.id;
	}
}
