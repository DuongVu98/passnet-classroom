export abstract class Entity {
	id: EntityId<any>;

	equals(object: Entity): boolean {
		return this.id.equals(object.id);
	}
}

export abstract class EntityId<T> {
    _id: T;
    
	constructor(id: T) {
		this._id = id;
	}
    abstract equals(idType: EntityId<T>): boolean;

    get id(): T {
        return this._id;
    }
}
