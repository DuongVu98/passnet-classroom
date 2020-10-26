export class UserAggregate {
	uid: string;
    isOnlineState: boolean;
    
    withUid(uid: string): UserAggregate {
        this.uid = uid;
        return this;
    }
    withOnlineState(isOnline: boolean): UserAggregate {
        this.isOnlineState = isOnline;
        return this;
    }
}
