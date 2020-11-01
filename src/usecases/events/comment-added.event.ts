import { Logger } from "@nestjs/common";
import { CommentAgregate } from "src/domain/aggregate/comment.aggregate";
import { ClassroomViewRepository } from "src/domain/view-repo/classroom-view.repository";
import { IDomainEvent } from "./event.factory";

export class CommentAddedEvent implements IDomainEvent {
    logger: Logger = new Logger("CommentAddedEvent")

    private viewRepository: ClassroomViewRepository;

	constructor(private aggregate: CommentAgregate) {}

	execute(): void {
        this.viewRepository.findByPostId(this.aggregate.postId).then(view => {
            this.logger.debug(`view find by postId: ${JSON.stringify(view)}`)
        })
    }

    withViewRepository(repository: ClassroomViewRepository): CommentAddedEvent {
        this.viewRepository = repository;
        return this;
    }
}
