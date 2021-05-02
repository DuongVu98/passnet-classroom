import { Logger } from "@nestjs/common";
import { Job, UserId } from "src/domain/aggregate/vos/value-objects";
import { RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { EventHandler } from "./event.handler";

export class RemoveStudentApplicationEventHandler implements EventHandler {
	logger: Logger = new Logger("RemoveStudentApplicationEventHandler");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	handle(event: Event): Promise<any> {
		if (event instanceof RemoveStudentApplicationExternalEvent) {
			return this.classroomRepository
				.findByJobId(new Job(event.jobId))
				.then((classroom) => {
					if (classroom != null) {
						const newTaList = classroom.teacherAssistanceList.filter((taId) => !(taId.userId.value === event.studentId));
						classroom.teacherAssistanceList = newTaList;

						return this.classroomRepository.update(classroom);
					}
				})
				.then((aggregate) => {
					if (aggregate != null) {
						this.logger.log(`handle remove-student-application-event for aggregate ${aggregate}`);
					}
				});
		} else {
			return Promise.reject();
		}
	}
}
