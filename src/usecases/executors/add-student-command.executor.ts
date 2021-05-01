import { AbstractCommandExecutor, CommandExecutor } from "src/usecases/executors/command.executor";
import { AddStudentCommand, BaseCommand } from "src/domain/commands/commands";
import { Logger } from "@nestjs/common";
import { User } from "src/domain/aggregate/value-objects";
import { Builder } from "builder-pattern";
import { Member } from "src/domain/aggregate/domain.entities";
import { ClassroomAggregateRepository } from "src/domain/repositories/aggregate.repository";
import { MemberEntityRepository } from "src/domain/repositories/member.repository";

export class AddStudentCommandExecutor extends AbstractCommandExecutor<AddStudentCommand, void> {
	logger: Logger = new Logger("AddStudentCommandExecutor");

	execute(): Promise<void> {
		this.logger.debug(`log aggregateId from command -> ${this.command.aggregateId}`);

		return this.aggregateRepository
			.findClassroom(this.command.aggregateId)
			.then(async (classroom) => {
				await classroom.addStudentToClassroom(Builder(Member).uid(this.command.studentId).build());
				return this.aggregateRepository.updateClassroom(classroom);
			})
			.then((aggregate) => {
				this.logger.log(`added new student to classroom ${aggregate}`);
			});
	}
}

export class AddStudentCommandExecutorTest implements CommandExecutor {
	logger: Logger = new Logger("AddStudentCommandExecutor");

	constructor(private classroomRepository: ClassroomAggregateRepository, private memberRepository: MemberEntityRepository) {}

	execute(command: BaseCommand): Promise<any> {
		if (command instanceof AddStudentCommand) {
			return this.classroomRepository.findClassroom(command.aggregateId).then((classroom) => {
				return this.memberRepository
					.findMemberByUid(command.studentId)
					.then((student) => {
						return { classroom, student };
					})
					.then(async (values) => {
						await values.classroom.students.push(values.student);
						await values.student.classrooms.push(values.classroom);

						await this.memberRepository.updateMember(values.student);
						await this.classroomRepository.updateClassroom(values.classroom);
					})
					.catch((error) => {
						this.logger.error(`error from addStudentToClassroom() -> ${error}`);
					});
			});
		} else {
			return Promise.reject();
		}
	}
}
