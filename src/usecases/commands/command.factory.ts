import { Inject, Injectable } from "@nestjs/common";
import { ClassroomAggregateRoot } from "src/domain/aggregate/classroom.aggregate";
import { ClassroomEntity } from "src/domain/entities/classroom.entity";
import { EntityRepository } from "src/domain/repositories/repository.interface";
import { CreateClassroomCommand } from "./create-classroom.command";

export interface ICommand {
    execute()
}

@Injectable()
export class CommandFactory {
    constructor(@Inject("classroom-repository") private classroomRepository: EntityRepository<ClassroomEntity>){}

    public getCreateClassroomCommand(aggregate: ClassroomAggregateRoot): ICommand {
        return new CreateClassroomCommand()
            .withAggregate(aggregate)
            .withClassroomRepository(this.classroomRepository);
    }
}