import { Injectable, Logger } from "@nestjs/common";
import {
	AddStudentCommand,
    AddTeacherAssistanceCommand,
	BaseCommand,
	CreateClassroomCommand,
    RemoveTeacherAssistanceCommand,
	UserAddCommentCommand,
	UserCreatePostCommand,
} from "src/domain/commands/commands";
import { CreateClassroomCommandExecutor } from "src/usecases/executors/create-classroom-command.executor";
import { AddStudentCommandExecutor } from "src/usecases/executors/add-student-command.executor";
import { UserCreatePostCommandExecutor } from "src/usecases/executors/user-create-post-command.executor";
import { UserAddCommentCommandExecutor } from "src/usecases/executors/user-add-comment-command.executor";
import { UuidGenerateService } from "src/usecases/services/uuid-generate.service";
import { ClassroomAggregateRepository } from "src/domain/repositories/classroom.repository";
import { CommandExecutor } from "../executors/command.executor";
import { AddTeacherAssistanceCommandExecutor } from "../executors/add-ta-command.executor";
import { RemoveTeacherAssistanceCommandExecutor } from "../executors/remove-ta-command.executor";

@Injectable()
export class CommandFactory {
	private logger: Logger = new Logger("CommandFactory");

	constructor(private aggregateRepository: ClassroomAggregateRepository, private uuidGenerateService: UuidGenerateService) {}

	produce(command: BaseCommand): CommandExecutor {
		if (command instanceof CreateClassroomCommand) {
			return this.produceCreateClassroomCommandExecutor(command);
		} else if (command instanceof AddStudentCommand) {
			return this.produceAddStudentCommandExecutor(command);
		} else if (command instanceof UserCreatePostCommand) {
			return this.produceUserCreatePostCommandExecutor(command);
		} else if (command instanceof UserAddCommentCommand) {
			return this.produceUserAddCommentCommandExecutor(command);
		} else if (command instanceof AddTeacherAssistanceCommand) {
			return this.produceAddTeacherAssistanceCommandExecutor(command);
		} else if (command instanceof RemoveTeacherAssistanceCommand) {
			return this.produceRemoveTeacherAssistanceCommandExecutor(command);
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
	private produceUserCreatePostCommandExecutor(command: UserCreatePostCommand): CommandExecutor {
		return new UserCreatePostCommandExecutor(this.aggregateRepository, this.uuidGenerateService);
	}
	private produceUserAddCommentCommandExecutor(command: UserAddCommentCommand): CommandExecutor {
		return new UserAddCommentCommandExecutor(this.aggregateRepository, this.uuidGenerateService);
	}
    private produceAddTeacherAssistanceCommandExecutor(command: AddTeacherAssistanceCommand): CommandExecutor {
		return new AddTeacherAssistanceCommandExecutor(this.aggregateRepository);
	}
    private produceRemoveTeacherAssistanceCommandExecutor(command: RemoveTeacherAssistanceCommand): CommandExecutor {
        return new RemoveTeacherAssistanceCommandExecutor(this.aggregateRepository);
    }
}
