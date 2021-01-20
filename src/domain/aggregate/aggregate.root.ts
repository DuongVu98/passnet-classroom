import { Document } from "mongoose";

export abstract class Entity extends Document {
	id: EntityId<any>;

	equals(object: Entity): boolean {
		return this.id.equals(object.id);
	}
}

export abstract class EntityId<T> {
	id: T;
	constructor(id: T) {
		this.id = id;
	}
	abstract equals(idType: EntityId<T>): boolean;
}
