import { Logger } from "@nestjs/common";
import { JobId } from "src/domain/aggregate/vos/job-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { RemoveStudentApplicationEvent } from "src/domain/events/events";
import { AbstractEventHandler } from "./event.handler";

export class RemoveStudentApplicationEventHandler extends AbstractEventHandler<RemoveStudentApplicationEvent, void> {
    logger: Logger = new Logger("RemoveStudentApplicationEventHandler");
    
    public handle(): Promise<void> {
        return this.aggregateRepository.findByJobId(new JobId(this.event.jobId))
            .then(classroom => {
                const newTaList = classroom.teacherAssistanceList.filter(taId => !taId.equals(new UserId(this.event.studentId)))
                classroom.teacherAssistanceList = newTaList;

                return this.aggregateRepository.updateById(classroom, classroom.id);
            })
            .then(aggregate => {
                this.logger.log(`handle accept-student-application-event for aggregate ${aggregate}`);
            });
    }
}