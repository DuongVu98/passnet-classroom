import { EntityId } from "./root-id";

export class CommentId implements EntityId{
    constructor(private id: string){}

    equals(idType: CommentId): boolean {
        return this.id === idType.id;
    }
}