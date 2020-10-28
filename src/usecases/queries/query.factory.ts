import { Injectable } from "@nestjs/common";
import { ClassroomQueryRepository } from "src/domain/view-repo/classroom-query.repository";
import { ClassroomViewDto } from "src/domain/views/classroom.view";
import { ClassroomViewQuery } from "./classroom-view.query";

export interface IQuery<VIEW> {
	get(): Promise<VIEW>;
}

@Injectable()
export class QueryFactory {
	constructor(private viewRepository: ClassroomQueryRepository) {}

	produceClassroomViewQuery(aggregateRootIdentifier: string): IQuery<ClassroomViewDto> {
		return new ClassroomViewQuery(aggregateRootIdentifier).withClassroomRepostiory(this.viewRepository);
	}
}
