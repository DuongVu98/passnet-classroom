import { Injectable, Logger } from "@nestjs/common";
import {
	AddStudentCommand,
	AddAssistantCommand,
	BaseCommand,
	CreateClassroomCommand,
	RemoveAssistantCommand,
	AddCommentCommand,
	CreatePostCommand,
	JoinClassroomByCodeCommand,
} from "src/domain/commands/commands";
import { CreateClassroomCommandExecutor } from "src/usecases/executors/create-classroom-command.executor";
import { AddStudentCommandExecutor } from "src/usecases/executors/add-student-command.executor";
import { UserCreatePostCommandExecutor } from "src/usecases/executors/user-create-post-command.executor";
import { AddCommentCommandExecutor } from "src/usecases/executors/user-add-comment-command.executor";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandExecutor } from "../executors/command.executor";
import { AddAssistantCommandExecutor } from "../executors/add-ta-command.executor";
import { RemoveAssistantCommandExecutor } from "../executors/remove-ta-command.executor";
import { JoinClassroomByCodeExecutor } from "../executors/join-classroom-by-code.command";

@Injectable()
export class CommandFactory {
	private logger: Logger = new Logger("CommandFactory");

	constructor(private aggregateRepository: ClassroomAggregateRepository, private uuidGenerateService: UuidGenerateService) {}

	produce(command: BaseCommand): CommandExecutor {
		if (command instanceof CreateClassroomCommand) {
			return this.produceCreateClassroomCommandExecutor(command);
		} else if (command instanceof AddStudentCommand) {
			return this.produceAddStudentCommandExecutor(command);
		} else if (command instanceof CreatePostCommand) {
			return this.produceCreatePostCommandExecutor(command);
		} else if (command instanceof AddCommentCommand) {
			return this.produceAddCommentCommandExecutor(command);
		} else if (command instanceof AddAssistantCommand) {
			return this.produceAddAssistantCommandExecutor(command);
		} else if (command instanceof RemoveAssistantCommand) {
			return this.produceRemoveAssistantCommandExecutor(command);
		} else if (command instanceof JoinClassroomByCodeCommand) {
			return this.produceJoinClassroomByCodeExecutor(command);
		} else {
			this.logger.error("command type not found");
			return null;
		}
	}

	private produceCreateClassroomCommandExecutor(command: CreateClassroomCommand): CommandExecutor {
		return new CreateClassroomCommandExecutor(this.aggregateRepository, this.uuidGenerateService);
	}
	private produceAddStudentCommandExecutor(command: AddStudentCommand): CommandExecutor {
		return new AddStudentCommandExecutor(this.aggregateRepository);
	}
	private produceCreatePostCommandExecutor(command: CreatePostCommand): CommandExecutor {
		return new UserCreatePostCommandExecutor(this.aggregateRepository, this.uuidGenerateService);
	}
	private produceAddCommentCommandExecutor(command: AddCommentCommand): CommandExecutor {
		return new AddCommentCommandExecutor(this.aggregateRepository, this.uuidGenerateService);
	}
	private produceAddAssistantCommandExecutor(command: AddAssistantCommand): CommandExecutor {
		return new AddAssistantCommandExecutor(this.aggregateRepository);
	}
	private produceRemoveAssistantCommandExecutor(command: RemoveAssistantCommand): CommandExecutor {
		return new RemoveAssistantCommandExecutor(this.aggregateRepository);
	}
	private produceJoinClassroomByCodeExecutor(command: JoinClassroomByCodeCommand): CommandExecutor {
		return new JoinClassroomByCodeExecutor(this.aggregateRepository);
	}
}
