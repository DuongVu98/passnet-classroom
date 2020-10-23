import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class UserRepository implements EntityRepository<UserEntity> {
	constructor(@InjectRepository(UserEntity) private classroomRepository: Repository<UserEntity>) {}

	findAll(): Promise<UserEntity[]> {
		throw new Error("Method not implemented.");
	}
	findById(id: string): Promise<UserEntity> {
		throw new Error("Method not implemented.");
	}
	insert(user: UserEntity): Promise<UserEntity> {
		throw new Error("Method not implemented.");
	}
	updateById(id: string, user: UserEntity): Promise<void> {
		throw new Error("Method not implemented.");
	}
	deleteById(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
