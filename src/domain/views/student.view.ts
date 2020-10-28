import { UserAggregate } from "../aggregate/user.aggregate";

export class StudentView {
	studentId: string;

	constructor(aggregate: UserAggregate) {
		this.studentId = aggregate.uid;
	}
}
