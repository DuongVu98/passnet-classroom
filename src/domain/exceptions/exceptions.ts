import { HttpException, HttpStatus } from "@nestjs/common";

export class ClassroomNotFoundException extends HttpException {
	constructor(aggregateId: string) {
		super(`Classroom with id ${aggregateId} not found`, HttpStatus.NOT_FOUND);
	}
}

export class ClassroomNotCreatedException extends HttpException {
	constructor(jobId: string) {
		super(`Classroom with id ${jobId} has not been created`, HttpStatus.NOT_FOUND);
	}
}
