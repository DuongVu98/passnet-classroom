import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Comment, Post } from "./aggregate-sql/entities";
import { ClassroomSchema } from "./aggregate/classroom.root";
import { ClassroomRepository } from "./repositories-sql/aggregate.repository";
import { ClassroomAggregateRootRepository } from "./repositories/classroom.repository";

@Module({
	imports: [
        MongooseModule.forFeature([{ name: "classrooms-repository", schema: ClassroomSchema, collection: "classrooms" }]),
        TypeOrmModule.forFeature([Classroom, Post, Comment])
    ],
	providers: [ClassroomAggregateRootRepository, ClassroomRepository],
	exports: [ClassroomAggregateRootRepository, ClassroomRepository],
})
export class DomainModule {}
