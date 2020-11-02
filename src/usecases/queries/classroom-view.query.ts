import { ClassroomQueryRepository } from "src/domain/view-repo/classroom-query.repository";
import { ClassroomViewDto } from "src/domain/views/classroom.view";
import { IQuery } from "./query.factory";

export class ClassroomViewQuery implements IQuery<ClassroomViewDto> {
	private classroomViewRepository: ClassroomQueryRepository;

	constructor(private aggregateRootIdentifier: string) {}

	async get(): Promise<ClassroomViewDto> {
		let view: ClassroomViewDto = null;
		await this.classroomViewRepository.getClassroomAggregateRoot(this.aggregateRootIdentifier).then((result) => {
			view = result;
		});
		return view;
	}
	withClassroomRepostiory(repository: ClassroomQueryRepository): ClassroomViewQuery {
		this.classroomViewRepository = repository;
		return this;
	}
}
