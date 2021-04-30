import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Comment, Post } from "./aggregate-sql/entities";
import { ClassroomRepository } from "./repositories-sql/aggregate.repository";

@Module({
	imports: [TypeOrmModule.forFeature([Classroom, Post, Comment])],
	providers: [ClassroomRepository],
	exports: [ClassroomRepository],
})
export class DomainModule {}
