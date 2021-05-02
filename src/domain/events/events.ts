export class Event {}

export class AcceptStudentApplicationExternalEvent extends Event {
	studentId: string;
	jobId: string;
}

export class RemoveStudentApplicationExternalEvent extends Event {
	studentId: string;
	jobId: string;
}
