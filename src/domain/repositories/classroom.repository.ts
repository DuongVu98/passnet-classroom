import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClassroomAggregateRoot } from "../aggregate/classroom.root";
import { ClassroomId } from "../aggregate/vos/classroom-id.vo";
import { PostId } from "src/domain/aggregate/vos/post-id.vo";

export class ClassroomAggregateRootRepository {
	logger: Logger = new Logger("ClassroomRepository");

	constructor(@InjectModel("classroom_aggregate_repository") private classroomModel: Model<ClassroomAggregateRoot>) {}

	async findAll(): Promise<ClassroomAggregateRoot[]> {
		return this.classroomModel.find();
	}

	async findById(id: ClassroomId): Promise<ClassroomAggregateRoot> {
		return this.classroomModel.findById(id);
	}

	async insert(data: ClassroomAggregateRoot): Promise<ClassroomAggregateRoot> {
		return this.classroomModel.create(data);
	}

	async updateById(data: ClassroomAggregateRoot, id: ClassroomId): Promise<ClassroomAggregateRoot> {
		return this.classroomModel.findByIdAndUpdate(id, data);
	}

	async removeById(id: ClassroomId): Promise<void> {
		this.classroomModel.findByIdAndRemove(id);
	}
}
