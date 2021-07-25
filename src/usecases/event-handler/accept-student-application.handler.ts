import { AcceptStudentApplicationExternalEvent } from "src/domain/events/events";
import { EventHandler } from "./event.handler";
import { Logger } from "@nestjs/common";
import { Job, ProfileId, Role } from "src/domain/aggregate/vos/value-objects";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { Builder } from "builder-pattern";

export class AcceptStudentApplicationEventHandler implements EventHandler {
	logger: Logger = new Logger("AcceptStudentApplicationEventHandler");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	handle(event: Event): Promise<any> {
		if (event instanceof AcceptStudentApplicationExternalEvent) {
			return this.classroomRepository
				.findByJobId(new Job(event.jobId))
				.then(async (classroom) => {
					this.logger.log(`handle accept-student-application-event for classroom ${classroom}`);

					if (classroom != null) {
						await classroom.members.push(
							Builder(Member).profileId(new ProfileId(event.studentId)).role(Role.ASSISTANT).build()
						);
						this.logger.log(`log updated classroom ${JSON.stringify(classroom.assistants)}`);
						return this.classroomRepository.update(classroom);
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
}
