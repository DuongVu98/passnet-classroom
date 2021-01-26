import { EntityId } from "../aggregate.root";
import * as mongoose from "mongoose";

export class ClassroomId extends EntityId<mongoose.Types.ObjectId> {

	constructor(id: string) {
        super(new mongoose.Types.ObjectId(id));
    }

	equals(idType: EntityId<mongoose.Types.ObjectId>): boolean {
		return this._id === idType._id;
	}
}
