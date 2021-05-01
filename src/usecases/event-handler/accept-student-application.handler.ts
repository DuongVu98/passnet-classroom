import { JobId } from "src/domain/aggregate/vos/job-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { AcceptStudentApplicationExternalEvent } from "src/domain/events/events";
import { AbstractEventHandler } from "./event.handler";
import { Logger } from "@nestjs/common";

export class AcceptStudentApplicationEventHandler extends AbstractEventHandler<AcceptStudentApplicationExternalEvent, void> {
	logger: Logger = new Logger("AcceptStudentApplicationEventHandler");

	public handle(): Promise<void> {
		return this.aggregateRepository
			.findByJobId(new JobId(this.event.jobId))
			.then(async (classroom) => {
				this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

				if (classroom != null) {
					await classroom.teacherAssistanceList.push(new UserId(this.event.studentId));
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
