import { EntityId } from "./vos/root-id";

export abstract class Entity {
	id: EntityId;

	equals(object: Entity): boolean {
		return this.id.equals(object.id)
	}
}
