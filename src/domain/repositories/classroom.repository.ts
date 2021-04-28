import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Builder } from "builder-pattern";
import { Model } from "mongoose";
import { ClassroomDocument, Classroom } from "../aggregate/classroom.root";
import { ClassroomId } from "../aggregate/vos/classroom-id.vo";
import { JobId } from "../aggregate/vos/job-id.vo";
import { UserId } from "../aggregate/vos/user-id.vos";

@Injectable()
export class ClassroomAggregateRootRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectModel("classrooms-repository") private classroomModel: Model<ClassroomDocument>) {}

	async findAll(): Promise<Classroom[]> {
		return (await this.classroomModel.find()).map((document) => {
			// document.id = new ClassroomId(document._id);
			return this.documentToSchema(document);
		});
		// return this.classroomModel.find();
	}

	async findById(id: ClassroomId): Promise<Classroom> {
		return this.classroomModel.findById(id).then((document) => {
			// document.id = new ClassroomId(document._id);
			return this.documentToSchema(document);
		});
		// return this.classroomModel.findById(id);
	}

	async findByJobId(jobId: JobId): Promise<Classroom> {
		return this.classroomModel.findOne({ jobId: jobId }).then((document) => {
			document.id = new ClassroomId(document._id);
			return document;
		});
		// return this.classroomModel.findOne({ jobId: jobId });
	}

	async insert(data: Classroom): Promise<Classroom> {
		return this.classroomModel.create(data);
	}

	async update(data: Classroom): Promise<Classroom> {
		return this.classroomModel.findOneAndUpdate(data);
	}

	async removeById(id: ClassroomId): Promise<void> {
		this.classroomModel.findByIdAndRemove(id);
	}

	documentToSchema(document: ClassroomDocument): Classroom {
		return Builder(Classroom)
			.id(new ClassroomId(document._id))
			.courseName(document.courseName)
			.jobId(new JobId(document.jobId._id))
			.posts(document.posts)
			.students(document.students)
			.teacherAssistanceList(document.teacherAssistanceList)
			.teacherId(new UserId(document.teacherId._id))
			.build();
	}
}
