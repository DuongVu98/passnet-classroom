import { JobId } from "src/domain/aggregate/vos/job-id.vo";
import { UserId } from "src/domain/aggregate/vos/user-id.vos";
import { AcceptStudentApplicationEvent } from "src/domain/events/events";
import { AbstractEventHandler } from "./event.handler";
import { Logger } from "@nestjs/common";

export class AcceptStudentApplicationEventHandler extends AbstractEventHandler<AcceptStudentApplicationEvent, void>{
    logger: Logger = new Logger("AcceptStudentApplicationEventHandler");
    
    public handle(): Promise<void> {
        return this.aggregateRepository.findByJobId(new JobId(this.event.jobId))
            .then(classroom => {
                classroom.teacherAssistanceList.push(new UserId(this.event.studentId))
                return this.aggregateRepository.updateById(classroom, classroom.id);
            })
            .then(aggregate => {
                this.logger.log(`handle accept-student-application-event for aggregate ${aggregate}`);
            });
    }
}