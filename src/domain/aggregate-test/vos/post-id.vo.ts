import { EntityId } from "./root-id";

export class PostId implements EntityId{
    constructor(private id: string){}

    equals(idType: PostId): boolean {
        return this.id === idType.id
    }
}