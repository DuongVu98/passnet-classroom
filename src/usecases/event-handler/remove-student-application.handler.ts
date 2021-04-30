import { Logger } from "@nestjs/common";
import { Job, User } from "src/domain/aggregate-sql/value-objects";
import { RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { AbstractEventHandler } from "./event.handler";

export class RemoveStudentApplicationEventHandler extends AbstractEventHandler<RemoveStudentApplicationExternalEvent, void> {
	logger: Logger = new Logger("RemoveStudentApplicationEventHandler");

	public handle(): Promise<void> {
		return this.aggregateRepository
			.findByJob(new Job(this.event.jobId))
			.then((classroom) => {
				if (classroom != null) {
					const newTaList = classroom.teacherAssistanceList.filter((ta) => !(ta === new User(this.event.studentId)));
					classroom.teacherAssistanceList = newTaList;

					return this.aggregateRepository.update(classroom);
				}
			})
			.then((aggregate) => {
				if (aggregate != null) {
					this.logger.log(`handle remove-student-application-event for aggregate ${aggregate}`);
				}
			});
	}
}
