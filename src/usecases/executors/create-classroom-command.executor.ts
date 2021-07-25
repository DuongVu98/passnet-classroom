import { CommandExecutor } from "src/usecases/executors/command.executor";
import { BaseCommand, CreateClassroomCommand } from "src/domain/commands/commands";
import { Classroom } from "src/domain/aggregate/entities/classroom.root";
import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { rejects } from "assert";
import { ClassCode, ClassroomId, CourseName, Job, OrganizationId, ProfileId, Role } from "src/domain/aggregate/vos/value-objects";
import { UuidGenerateService } from "../services/uuid-generate.service";
import { CommandNotCompatibleException } from "src/domain/exceptions/exceptions";

export class CreateClassroomCommandExecutor implements CommandExecutor {
	logger: Logger = new Logger("CreateClassroomCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository, private uuidGenerateService: UuidGenerateService) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof CreateClassroomCommand) {
			const teacherAssistanceList = command.taIds.map((id) =>
				Builder(Member).profileId(new ProfileId(id)).role(Role.ASSISTANT).build()
			);

			const classroom: Classroom = Builder(Classroom)
				.classroomId(new ClassroomId(this.uuidGenerateService.generateUUID()))
				.members([
					...teacherAssistanceList,
					Builder(Member).profileId(new ProfileId(command.teacherId)).role(Role.LECTURER).build(),
				])
				.courseName(new CourseName(command.courseName))
				.classCode(new ClassCode(this.generateCode()))
				.organizationId(new OrganizationId(command.organizationId))
				.jobId(new Job(command.jobId))
				.posts([])
				.build();

			return this.classroomRepository.insert(classroom).then((result) => {
				this.logger.log(`Result: ${result}`);
			});
		} else {
			return Promise.reject(new CommandNotCompatibleException("CreateClassroomCommand"));
		}
	}

	private generateCode(): string {
		return Math.random().toString(36).substring(7);
	}
}
