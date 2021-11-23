
export interface AddCourseFormProps{
    course?: CourseData;
  onSuccess?: (course: CourseData) => void;
}
export interface AddChapterFormProps {
    courseId?: number;
    scheduleId?: number;
    onSuccess?: () => void;
    isAdd?: boolean;
  }
export enum DurationUnit {
    'year' = 1,
    'month',
    'day' ,
    'week' ,
    'hour' 
  }
export interface CourseRequest {
    page?:number;
    limit?:number;
    uid?:string;
    userId?:number;
    name?:string;
    type?:string;

}
export interface CourseDetailRequest{
    id:string|string[]
}
export interface AddCourseRequest{
    cover: string;
    detail: string;
    duration:number;
    durationUnit:number;
    maxStudents: number;
    name: string;
    price: number;
    startTime: string;
    teacherId: number;
    type: number[]|string[];
    uid: string;
}
export  interface UpdateCourseRequest{
    courseId:number;
    scheduleId:number;
    chapters:{name:string,content:string,order:number}[];
    classTime:string[]
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
    price:number;
    uid:string;
    star:number;
    startTime:string;
    status:number;
    scheduleId:number;
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
export const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
