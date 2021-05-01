import { Injectable, Logger } from "@nestjs/common";
import {
	AddStudentCommand,
	BaseCommand,
	CreateClassroomCommand,
	UserAddCommentCommand,
	UserCreatePostCommand,
} from "src/domain/commands/commands";
import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import { CreateClassroomCommandExecutor } from "src/usecases/executors/create-classroom-command.executor";
import { AddStudentCommandExecutor } from "src/usecases/executors/add-student-command.executor";
import { UserCreatePostCommandExecutor } from "src/usecases/executors/user-create-post-command.executor";
import { UserAddCommentCommandExecutor } from "src/usecases/executors/user-add-comment-command.executor";
import { Builder } from "builder-pattern";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { ClassroomAggregateRepository } from "src/domain/repositories/aggregate.repository";

@Injectable()
export class CommandFactory {
	private logger: Logger = new Logger("CommandFactory");

	constructor(private uuidGenerateService: UuidGenerateService, private aggregateRepository: ClassroomAggregateRepository) {}

	produceCreateClassroomCommandExecutor(command: CreateClassroomCommand): AbstractCommandExecutor<CreateClassroomCommand, void> {
		this.logger.debug(`create-class-command`);
		return Builder(CreateClassroomCommandExecutor).command(command).aggregateRepository(this.aggregateRepository).build();
	}
	produceAddStudentCommandExecutor(command: AddStudentCommand): AbstractCommandExecutor<AddStudentCommand, void> {
		return Builder(AddStudentCommandExecutor).command(command).aggregateRepository(this.aggregateRepository).build();
	}
	produceUserCreatePostCommandExecutor(command: UserCreatePostCommand): AbstractCommandExecutor<UserCreatePostCommand, void> {
		return Builder(UserCreatePostCommandExecutor)
			.command(command)
			.aggregateRepository(this.aggregateRepository)
			.uuidGenerateService(this.uuidGenerateService)
			.build();
	}
	produceUserAddCommentCommandExecutor(command: UserAddCommentCommand): AbstractCommandExecutor<UserAddCommentCommand, void> {
		return Builder(UserAddCommentCommandExecutor)
			.command(command)
			.aggregateRepository(this.aggregateRepository)
			.uuidGenerateService(this.uuidGenerateService)
			.build();
	}
}
