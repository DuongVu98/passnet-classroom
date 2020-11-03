import { EntityId } from "./root-id";

export class ClassroomId implements EntityId {
    constructor(private id: string) {}
    
    equals(idType: ClassroomId): boolean {
        return this.id === idType.id;
    }
}
