import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { StudentView } from "src/domain/views/student.view";
import { IDomainEvent } from "./event.factory";

export class StudentAddedEvent implements IDomainEvent {
	private classroomViewRepository: ClassroomViewRepository;

	constructor(private aggregate: UserAggregate, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.classroomViewRepository.findById(this.aggregateRootIdentifier).then(async (classroomView) => {
			await classroomView.students.push(new StudentView(this.aggregate));
			this.classroomViewRepository.update(classroomView.classroomId, classroomView);
		});
    }
    
    withClassroomViewRepository(repository: ClassroomViewRepository): StudentAddedEvent {
        this.classroomViewRepository = repository;
        return this;
    }
}
