import internal from "stream";


export interface CourseParam {
    page:number;
    limit:number;
}
interface CourseType{
    id:number;
    name:string;
}
export interface CourseData {
    createAt:string;
    updateAt:string;
    id:number;
    cover:string;
    detail:string;
    duration:number;
    durationUnit:number;
    maxStudents:number;
    name:string;
    price:internal;
    uid:string;
    star:number;
    startTime:string;
    status:number;
    scheduledId:number;
    teacherId:number;
    type:CourseType[];
    teacherName:string;

}