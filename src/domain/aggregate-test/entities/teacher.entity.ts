import { UserOnlineState } from "../vos/online-state.o";
import { UserId } from "../vos/user-id.vos";
import { UserDisplayName } from "../vos/user-name.vo";

export class Teacher {
    uid: UserId
	name: UserDisplayName;
	onlineState: UserOnlineState;
}
