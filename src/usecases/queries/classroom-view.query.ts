import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { ClassroomViewDto } from "src/domain/views/classroom.view";
import { IQuery } from "./query.factory";

export class ClassroomViewQuery implements IQuery<ClassroomViewDto> {
	private classroomViewRepository: ClassroomViewRepository;

	constructor(private aggregateRootIdentifier: string) {}

    async get(): Promise<ClassroomViewDto> {
        let view: ClassroomViewDto = null;
        await this.classroomViewRepository.queryTest(this.aggregateRootIdentifier).then(result => {
            view = result;
        })
        return view;
    }
	withClassroomRepostiory(repository: ClassroomViewRepository): ClassroomViewQuery {
		this.classroomViewRepository = repository;
		return this;
	}
}
