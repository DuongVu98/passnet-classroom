import { PostView } from "./post.view";
import { StudentView } from "./student.view";
import { TeacherView } from "./teacher.view";

export class ClassroomView {
    classroomId: string;
    courseName: string;
    students: StudentView[];
    teacher: TeacherView;
    teacherAssistances: StudentView[];
    posts: PostView[];
}
