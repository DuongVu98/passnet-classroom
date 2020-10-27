import { UserAggregate } from "../aggregate/user.aggregate";

export class TeacherView {
    teacherId: string;
    
    constructor(teacherAggregate: UserAggregate){
        this.teacherId = teacherAggregate.uid;
    }
}
