import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClassroomView, ClassroomViewDto } from "../views/classroom.view";

@Injectable()
export class ClassroomQueryRepository {
	constructor(@InjectModel("classroom_views") private viewModel: Model<ClassroomView>) {}

	async getClassroomAggregateRoot(aggregateRoot: string): Promise<ClassroomViewDto> {
		return this.viewModel.aggregate([{ $match: { classroomId: aggregateRoot } }]).exec();
	}
}
