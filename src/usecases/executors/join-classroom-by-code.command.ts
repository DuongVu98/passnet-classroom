import { Logger } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Classroom } from "src/domain/aggregate/entities/classroom.root";
import { Member } from "src/domain/aggregate/entities/member.entity";
import { OrganizationId, ProfileId, Role } from "src/domain/aggregate/vos/value-objects";
import { BaseCommand, JoinClassroomByCodeCommand } from "src/domain/commands/commands";
import { ClassroomNotFoundException, CommandNotCompatibleException } from "src/domain/exceptions/exceptions";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandExecutor } from "./command.executor";

export class JoinClassroomByCodeExecutor implements CommandExecutor {
	logger: Logger = new Logger("JoinClassroomByCodeExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof JoinClassroomByCodeCommand) {
			return this.classroomRepository
				.findAllByOrg(new OrganizationId(command.orgId))
				.then((classroom) => {
					return classroom.filter((classroom) => classroom.classCode.value === command.classCode)[0];
				})
				.then((classroom) => this.isExist(classroom, command.classCode))
				.then(async (classroom) => {
					await classroom.members.push(Builder(Member).profileId(new ProfileId(command.memberId)).role(Role.STUDENT).build());
					return this.classroomRepository.insert(classroom);
				});
		} else {
			return Promise.reject(new CommandNotCompatibleException("JoinClassroomByCodeCommand"));
		}
	}

	isExist(aggregate: Classroom, code: string): Promise<Classroom> {
		if (aggregate != null) {
			return Promise.resolve(aggregate);
		} else {
			return Promise.reject(new ClassroomNotFoundException(`[code: ${code}`));
		}
	}
}
