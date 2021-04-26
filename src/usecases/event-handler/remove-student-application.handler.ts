import { Logger } from "@nestjs/common";
import { JobId } from "src/domain/aggregate/vos/job-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { RemoveStudentApplicationExternalEvent } from "src/domain/events/events";
import { AbstractEventHandler } from "./event.handler";

export class RemoveStudentApplicationEventHandler extends AbstractEventHandler<RemoveStudentApplicationExternalEvent, void> {
	logger: Logger = new Logger("RemoveStudentApplicationEventHandler");

	public handle(): Promise<void> {
		return this.aggregateRepository
			.findByJobId(new JobId(this.event.jobId))
			.then((classroom) => {
                if(classroom != null) {
                    const newTaList = classroom.teacherAssistanceList.filter((taId) => !taId.equals(new UserId(this.event.studentId)));
                    classroom.teacherAssistanceList = newTaList;
    
                    return this.aggregateRepository.update(classroom);
                }
			})
			.then((aggregate) => {
                if(aggregate != null) {
                    this.logger.log(`handle remove-student-application-event for aggregate ${aggregate}`);
                }
			});
	}
}
