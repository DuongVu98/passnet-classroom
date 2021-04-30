import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Comment, Member, Post } from "./aggregate-sql/domain.entities";
import { ClassroomAggregateRepository } from "./repositories-sql/aggregate.repository";

@Module({
	imports: [
		TypeOrmModule.forFeature([Classroom, Post, Comment, Member])
	],
	providers: [ClassroomAggregateRepository],
	exports: [ClassroomAggregateRepository],
})
export class DomainModule {
}
