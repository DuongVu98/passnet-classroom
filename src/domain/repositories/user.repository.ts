import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { EntityRepository } from "./repository.interface";

@Injectable()
export class UserRepository implements EntityRepository<UserEntity> {
	constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

	async findAll(): Promise<UserEntity[]> {
		return this.userRepository.find();
	}
	async findById(id: string): Promise<UserEntity> {
		return this.userRepository.findOne({ where: { id: id } });
	}
	async insert(user: UserEntity): Promise<UserEntity> {
		return await this.userRepository.save(user);
	}
	async updateById(id: string, data: UserEntity): Promise<void> {
		const user = await this.userRepository.findOne({ where: { id: id } });
		if (!user) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		await this.userRepository.update(id, data);
	}
	async deleteById(id: string): Promise<void> {
		const user = await this.userRepository.findOne({ where: { id: id } });
		if (!user) {
			throw new HttpException("Not found", HttpStatus.NOT_FOUND);
		}
		await this.userRepository.delete(id);
	}
}
