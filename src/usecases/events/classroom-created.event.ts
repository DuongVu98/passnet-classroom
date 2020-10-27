import { Logger } from "@nestjs/common";
import { CommentAgregate } from "src/domain/aggregate/comment.aggregate";
import { PostAggregate } from "src/domain/aggregate/post.aggregate";
import { UserAggregate } from "src/domain/aggregate/user.aggregate";
import { IAggregateMapper } from "src/domain/mappers/aggregate.mapper";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { ClassroomViewBuilder } from "src/domain/views/classroom.view";
import { TeacherView } from "src/domain/views/teacher.view";
import { ClassroomAggregateRoot } from "../../domain/aggregate/classroom.aggregate";
import { IDomainEvent } from "./event.factory";

export class ClassroomCreatedEvent implements IDomainEvent {
	logger: Logger = new Logger();

	private classroomViewRepository: ClassroomViewRepository;
	private userAggregateMapper: IAggregateMapper<UserAggregate>;
	private postAggregateMapper: IAggregateMapper<PostAggregate>;
	private commentAggregateMapper: IAggregateMapper<CommentAgregate>;

	constructor(private aggregate: ClassroomAggregateRoot, private aggregateRootIdentifier: string) {}

	execute(): void {
		this.logger.log(`log from event --> ${this.aggregate} - ${this.aggregateRootIdentifier}`);

		const classroomViewBuilder: ClassroomViewBuilder = new ClassroomViewBuilder()
			.withClassroomId(this.aggregate.classroomId)
			.withCourseName(this.aggregate.courseName);

		this.userAggregateMapper.toAggregate(this.aggregate.teacherId).then((teacher) => {
            const teacherView = new TeacherView(teacher);
            classroomViewBuilder.withTeacher(teacherView);

            
		});
	}
}
