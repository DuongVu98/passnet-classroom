import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Member } from "../aggregate/domain.entities";

@Injectable()
export class MemberEntityRepository {
    constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {}

	findMember(id: string): Promise<Member> {
		return this.memberRepository.findOne({ where: { id } });
	}

    findMemberByUid(uid: string): Promise<Member> {
        return this.
    }

	insertMember(member: Member): Promise<Member> {
		return this.memberRepository.save(member);
	}

	updateMember(member: Member): Promise<any> {
		return this.memberRepository.update(member.id, member);
	}

	removeMember(id: string): Promise<void> {
		return this.memberRepository.findOne({ where: { id } }).then((member) => {
			this.memberRepository.delete(member);
		});
	}

    removeMemberByUid(uid: string) : Promise<void> {
        return this.memberRepository.findOne({ where: { uid } }).then((member) => {
			this.memberRepository.delete(member);
		});
    }
}