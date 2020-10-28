import { Logger } from "@nestjs/common";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { ClassroomViewBuilder, ClassroomViewDtoBuilder } from "src/domain/views/classroom.view";
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
		this.logger.log(`Event execution --> ${this.aggregate} - ${this.aggregateRootIdentifier}`);

		const teacherAssistanceViewsList: StudentView[] = [];
		await this.aggregate.teacherAssistancesId.map((id) =>
			this.userAggregateMapper.toAggregate(id).then((taAggregate) => {
				teacherAssistanceViewsList.push(new StudentView(taAggregate));
			})
		);

		this.logger.log(`After getting TA views list`);

		this.userAggregateMapper
			.toAggregate(this.aggregate.teacherId)
			.then((teacher) => {
				this.logger.log(`teacher id from aggregate mapper --> ${teacher.uid}`);
				const newView = new ClassroomViewDtoBuilder()
					.withClassroomId(this.aggregate.classroomId)
					.withCourseName(this.aggregate.courseName)
					.withTeacher(new TeacherView(teacher))
					.withTeacherAssistances(teacherAssistanceViewsList)
                    .build();
                this.logger.log(`new view --> ${newView}`)
				return newView;
			})
			.then((newView) => {
				this.logger.log(`log new view --> \n${JSON.stringify(newView, null, 2)}`);
				this.classroomViewRepository.insert(newView);
			})
			.catch((error) => {
				this.logger.log(`error from promise --> ${error}`);
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
