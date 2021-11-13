export interface StudentData{
    address:string[],
    age:number,
    avatar:string,
    country:string,
    education:string,
    gender:number,
    memberStartAt:string,
    memberEndAt:string,
    type:Type,
    createdAt:string,
    updatedAt:string,
    interest:string[],
    courses:Courses[],
    description:string,
    name:string,
    email:string,
    phone:string
    





}
interface Type{
    id:number,
    name:string
}
interface Courses{
    courseDate:string,
    courseId:number,
    createdAt:string,
    id:number,
    name:string,
    studentId:number,
    updatedAt:string,
    type:Type[]
}