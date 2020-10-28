import { UserAggregate } from "../aggregate/user.aggregate";

export class StudentView {
	studentId: string;
	onlineState: boolean;

	constructor(aggregate: UserAggregate) {
		this.studentId = aggregate.uid;
		this.onlineState = aggregate.isOnlineState;
	}
}
