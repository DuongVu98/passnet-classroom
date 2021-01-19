import { Injectable } from "@nestjs/common";
import {
	AddStudentCommand,
	BaseCommand,
	CreateClassroomCommand, UserAddCommentCommand,
	UserCreatePostCommand
} from "src/domain/commands/commands";
import { AbstractCommandExecutor } from "src/usecases/executors/command.executor";
import {
	CreateClassroomCommandExecutor
} from "src/usecases/executors/create-classroom-command.executor";
import { Builder } from "builder-pattern";
import { ClassroomAggregateRootRepository } from "src/domain/repositories/classroom.repository";
import { AddStudentCommandExecutor } from "src/usecases/executors/add-student-command.executor";
import {
	UserCreatePostCommandExecutor
} from "src/usecases/executors/user-create-post-command.executor";
import {
	UserAddCommentCommandExecutor
} from "src/usecases/executors/user-add-comment-command.executor";

@Injectable()
export class CommandFactory {

	constructor(private aggregateRepository: ClassroomAggregateRootRepository) {
	}

	produceCommandExecutor(command: BaseCommand): AbstractCommandExecutor<any, any> {
		if (command instanceof CreateClassroomCommand) {
			return Builder<CreateClassroomCommandExecutor>()
				.command(command)
				.aggregateRepository(this.aggregateRepository)
				.build();
		} else if (command instanceof AddStudentCommand) {
			return Builder<AddStudentCommandExecutor>()
				.command(command)
				.aggregateRepository(this.aggregateRepository)
				.build();
		} else if (command instanceof UserCreatePostCommand) {
			return Builder<UserCreatePostCommandExecutor>()
				.command(command)
				.aggregateRepository(this.aggregateRepository)
				.build();
		} else if (command instanceof UserAddCommentCommand) {
			return Builder<UserAddCommentCommandExecutor>()
				.command(command)
				.aggregateRepository(this.aggregateRepository)
				.build();
		}
	}
}
