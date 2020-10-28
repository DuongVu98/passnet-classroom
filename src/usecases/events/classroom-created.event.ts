import { Logger } from "@nestjs/common";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { ClassroomViewDtoBuilder } from "src/domain/views/classroom.view";
import { StudentView } from "src/domain/views/student.view";
import { TeacherView } from "src/domain/views/teacher.view";
import { ClassroomAggregateRoot } from "../../domain/aggregate/classroom.aggregate";
import { IDomainEvent } from "./event.factory";

export class ClassroomCreatedEvent implements IDomainEvent {
	logger: Logger = new Logger("ClassroomCreatedEvent");

	private classroomViewRepository: ClassroomViewRepository;
	private userAggregateMapper: IAggregateMapper<UserAggregate>;

	constructor(private aggregate: ClassroomAggregateRoot, private aggregateRootIdentifier: string) {}

	async execute(): Promise<void> {
		const teacherAssistanceViewsList: StudentView[] = [];
		await this.aggregate.teacherAssistancesId.map((id) =>
			this.userAggregateMapper.toAggregate(id).then((taAggregate) => {
				teacherAssistanceViewsList.push(new StudentView(taAggregate));
			})
		);

		this.userAggregateMapper
			.toAggregate(this.aggregate.teacherId)
			.then((teacher) =>
				new ClassroomViewDtoBuilder()
					.withClassroomId(this.aggregateRootIdentifier)
					.withCourseName(this.aggregate.courseName)
					.withTeacher(new TeacherView(teacher))
					.withTeacherAssistances(teacherAssistanceViewsList)
					.build()
			)
			.then((newView) => {
				this.classroomViewRepository.insert(newView);
			})
			.catch((error) => {
				this.logger.log(`promise rejection from execute() --> ${error}`);
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
