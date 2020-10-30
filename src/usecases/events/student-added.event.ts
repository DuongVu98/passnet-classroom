import { Logger } from "@nestjs/common";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { StudentView } from "src/domain/views/student.view";
import { IDomainEvent } from "./event.factory";

export class StudentAddedEvent implements IDomainEvent {
	logger: Logger = new Logger("StudentAddedEvent");

	private classroomViewRepository: ClassroomViewRepository;

	constructor(private aggregate: UserAggregate, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.classroomViewRepository
			.findById(this.aggregateRootIdentifier)
			.then(async (classroomView) => {
				this.logger.debug(`view after findById() --> ${JSON.stringify(classroomView)}`);
				await classroomView.students.push(new StudentView(this.aggregate));
				return this.classroomViewRepository.update(this.aggregateRootIdentifier, classroomView);
			})
			.catch((error) => {
				this.logger.error(`error when update new view --> ${error}`);
			});
	}

	withClassroomViewRepository(repository: ClassroomViewRepository): StudentAddedEvent {
		this.classroomViewRepository = repository;
		return this;
	}
}
