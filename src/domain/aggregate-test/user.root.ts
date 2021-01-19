import { Prop, Schema } from "@nestjs/mongoose";
import { Entity } from "./aggregate.root";
import { UserOnlineState } from "./vos/online-state.o";
import { UserId } from "./vos/user-id.vos";
import { UserDisplayName } from "./vos/user-name.vo";

@Schema()
export class UserAggregateRoot extends Entity {

    @Prop({name: "user_id"})
    id: UserId;
    
    @Prop({name: "displayName"})
    displayName: UserDisplayName;
    
    @Prop({name: "online_state"})
	onlineState: UserOnlineState;

	login(): void {
		this.onlineState = new UserOnlineState(true);
	}
	logout(): void {
		this.onlineState = new UserOnlineState(false);
	}
}
