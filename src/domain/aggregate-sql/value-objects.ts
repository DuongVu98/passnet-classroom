import { Column } from "typeorm";

export class CourseName {
	constructor(value: string) {
		this.value = value;
	}

	@Column()
	value: string;
}

export class User {
	constructor(value: string) {
		this.value = value;
	}

	@Column()
	value: string;
}

export class Content {
	constructor(value: string) {
		this.value = value;
	}

	@Column()
	value: string;
}
export class Job {
	constructor(value: string) {
		this.value = value;
	}

	@Column()
	value: string;
}
