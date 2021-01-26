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
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { AddStudentCommandExecutor } from "src/usecases/executors/add-student-command.executor";
import { UserCreatePostCommandExecutor } from "src/usecases/executors/user-create-post-command.executor";
import { UserAddCommentCommandExecutor } from "src/usecases/executors/user-add-comment-command.executor";
import { Builder } from "builder-pattern";

@Injectable()
export class CommandFactory {
	private logger: Logger = new Logger("CommandFactory");

	constructor(private aggregateRepository: ClassroomAggregateRootRepository) {}

	produceCreateClassroomCommandExecutor(command: CreateClassroomCommand): AbstractCommandExecutor<CreateClassroomCommand, void> {
		this.logger.debug(`create-class-command`);
		return Builder(CreateClassroomCommandExecutor).command(command).aggregateRepository(this.aggregateRepository).build();
	}
	produceAddStudentCommandExecutor(command: AddStudentCommand): AbstractCommandExecutor<AddStudentCommand, void> {
		return Builder(AddStudentCommandExecutor).command(command).aggregateRepository(this.aggregateRepository).build();
	}
	produceUserCreatePostCommandExecutor(command: UserCreatePostCommand): AbstractCommandExecutor<UserCreatePostCommand, void> {
		return Builder(UserCreatePostCommandExecutor).command(command).aggregateRepository(this.aggregateRepository).build();
	}
	produceUserAddCommentCommandExecutor(command: UserAddCommentCommand): AbstractCommandExecutor<UserAddCommentCommand, void> {
		return Builder(UserAddCommentCommandExecutor).command(command).aggregateRepository(this.aggregateRepository).build();
	}
}
