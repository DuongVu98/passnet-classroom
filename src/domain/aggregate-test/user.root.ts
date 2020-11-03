import { Entity } from "./aggregate.root";
import { UserOnlineState } from "./vos/online-state.o";
import { UserId } from "./vos/user-id.vos";
import { UserDisplayName } from "./vos/user-name.vo";

export class UserAggregateRoot extends Entity{
    id: UserId;
    name: UserDisplayName;
	onlineState: UserOnlineState;

	login(): void {
		this.onlineState = new UserOnlineState(true);
	}
	logout(): void {
		this.onlineState = new UserOnlineState(false);
	}
}
