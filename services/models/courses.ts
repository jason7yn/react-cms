import internal from "stream";


export interface CourseRequest {
    page:number;
    limit:number;
}
export interface CourseDetailRequest{
    id:string|string[]
}
interface CourseType{
    id:number;
    name:string;
}
export interface Chapter{
    createdAt:string;
    updatedAt:string;
    id:number;
    name:string;
    order:number;
    content:string;
}
interface Sale{
    createdAt:string;
    updatedAt:string;
    id:number;
    batches:number;
    price:number;
    earnings:number;
    padiAmount:number;
    studentAmount:number;
    paidIds:number[]
}
export interface Schedule{
    createAt:string;
    updateAt:string;
    id:number;
    status:number;
    current:number;
    classTime:string[];
    chapters:Chapter[];
}
export interface CourseData {
    createdAt:string;
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

export interface CourseDetail extends CourseData{

    schedule:Schedule;
    sales:Sale;
}

export enum CourseStatusText {
    'finished',
    'processing',
    'pending',
}
export enum CourseStatusColor {
    'default',
    'green',
    'orange',
}
