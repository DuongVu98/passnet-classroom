import { Entity } from "../aggregate.root";
import { UserOnlineState } from "../vos/online-state.o";
import { UserId } from "../vos/user-id.vos";
import { UserDisplayName } from "../vos/user-name.vo";

export class Teacher extends Entity{
    uid: UserId
	name: UserDisplayName;
	onlineState: UserOnlineState;
}
