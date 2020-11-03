import { EntityId } from "./root-id";

export class UserId implements EntityId {
	constructor(private id: string) {}

	equals(idType: UserId): boolean {
		return this.id === idType.id;
	}
}
