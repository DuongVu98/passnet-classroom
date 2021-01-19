import { EntityId } from "../aggregate.root";

export class PostId extends EntityId<string> {
	constructor(id: string) {
		super(id);
	}
	equals(idType: EntityId<string>): boolean {
		return this.id === idType.id;
	}
}
