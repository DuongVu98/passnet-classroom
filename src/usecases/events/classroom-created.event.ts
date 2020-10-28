import { Logger } from "@nestjs/common";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { ClassroomViewBuilder } from "src/domain/views/classroom.view";
import { StudentView } from "src/domain/views/student.view";
import { TeacherView } from "src/domain/views/teacher.view";
import { ClassroomAggregateRoot } from "../../domain/aggregate/classroom.aggregate";
import { IDomainEvent } from "./event.factory";

export class ClassroomCreatedEvent implements IDomainEvent {
	logger: Logger = new Logger();

	private classroomViewRepository: ClassroomViewRepository;
	private userAggregateMapper: IAggregateMapper<UserAggregate>;

	constructor(private aggregate: ClassroomAggregateRoot, private aggregateRootIdentifier: string) {}

	async execute(): Promise<void> {
		this.logger.log(`log from event --> ${this.aggregate} - ${this.aggregateRootIdentifier}`);

		const teacherAssistanceViewsList = [];
		await this.aggregate.teacherAssistancesId.map((id) =>
			this.userAggregateMapper.toAggregate(id).then((taAggregate) => {
				teacherAssistanceViewsList.push(new StudentView(taAggregate));
			})
		);

		this.userAggregateMapper.toAggregate(this.aggregate.teacherId).then((teacher) => {
			const newClassroomView = new ClassroomViewBuilder()
				.withClassroomId(this.aggregate.classroomId)
				.withCourseName(this.aggregate.courseName)
				.withTeacher(new TeacherView(teacher))
				.withTeacherAssistances(teacherAssistanceViewsList)
				.build();

			this.classroomViewRepository.insert(newClassroomView);
		});
	}

	withViewRepository(repository: ClassroomViewRepository): ClassroomCreatedEvent {
		this.classroomViewRepository = repository;
		return this;
	}
	withUserAggregateMapper(mapper: IAggregateMapper<UserAggregate>): ClassroomCreatedEvent {
		this.userAggregateMapper = mapper;
		return this;
	}
}
