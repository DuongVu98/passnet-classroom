import { Inject, Injectable } from "@nestjs/common";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { EntityRepository } from "src/domain/repositories/repository.interface";

@Injectable()
export class SomeService {
    constructor(@Inject("classroom-repository") private classroomRepository: EntityRepository<ClassroomEntity>){}

    someExecute(): void {
        this.classroomRepository.findAll()
    }
}