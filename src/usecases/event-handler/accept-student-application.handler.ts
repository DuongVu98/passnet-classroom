import { AcceptStudentApplicationExternalEvent } from "src/domain/events/events";
import { AbstractEventHandler } from "./event.handler";
import { Logger } from "@nestjs/common";
import { Job, User } from "src/domain/aggregate-sql/value-objects";
import { Member } from "src/domain/aggregate-sql/domain.entities";
import { Builder } from "builder-pattern";

export class AcceptStudentApplicationEventHandler extends AbstractEventHandler<AcceptStudentApplicationExternalEvent, void> {
	logger: Logger = new Logger("AcceptStudentApplicationEventHandler");

	public handle(): Promise<void> {
		return this.aggregateRepository
			.findByJob(new Job(this.event.jobId))
			.then(async (classroom) => {
				this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

				if (classroom != null) {
					await classroom.teacherAssistanceList.push(Builder(Member).uid(this.event.studentId).build());
					this.logger.log(`log updated classroom ${JSON.stringify(classroom.teacherAssistanceList)}`);
					return this.aggregateRepository.update(classroom);
				}
			})
			.then((aggregate) => {
				if (aggregate != null) {
					this.logger.log(`handle accept-student-application-event for aggregate ${aggregate}`);
				} else {
					this.logger.log(`aggregate after updated is null: ${aggregate}`);
				}
			});
	}
}
