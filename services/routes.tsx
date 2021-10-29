import {
    CalendarOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
    EditOutlined,
    FileAddOutlined,
    MessageOutlined,
    ProfileOutlined,
    ProjectOutlined,
    ReadOutlined,
    SolutionOutlined,
    TeamOutlined
} from '@ant-design/icons';


//根据routes结构和当前登录用户的ROLE，生成side menu（不变）
//通过当前url与routes结构结合，实现动态选择side menu item （随url改变而改变）
//根据当前url与routes结构结合，实现动态生成breadcrumb (随着url改变而改变)
export enum RoutePath {
    manager = 'manager',
    teachers = 'teachers',
    students = 'students',
    selectStudents = 'selectStudents',
    courses = 'courses',
    addCourse = 'add-course',
    editCourse = 'edit-course',
    own = 'own',
    schedule = 'schedule',
    profile = 'profile',
    message = 'message',
}
enum Roles {
    manager = 'manager',
    teacher = 'teacher',
    student = 'student'
}

type Role = 'manager' | 'student' | 'teacher';

export interface SideNav {
    icon?: JSX.Element;
    label: string; //menu item name
    path: string[]; //corresponding url path
    subNav?: SideNav[]; //whether has a sub menu
    hide?: boolean;
    hideLinkInBreadcrumb?: boolean;
}
const students: SideNav = {
    path: [RoutePath.students],
    label: 'Student',
    icon: <SolutionOutlined />,
    hideLinkInBreadcrumb: true,
    subNav: [{ path: [''], label: 'Student List', icon: <TeamOutlined /> }],
}
const courses: SideNav = {
    path: [RoutePath.courses],
    label: 'Course',
    icon: <ReadOutlined />,
    hideLinkInBreadcrumb: true,
    subNav: [
        { path: [''], label: 'All Courses', icon: <ProjectOutlined /> },
        { path: [RoutePath.addCourse], label: 'Add Course', icon: <FileAddOutlined /> },
        { path: [RoutePath.editCourse], label: 'Edit Course', icon: <EditOutlined /> }
    ]
}
const teachers: SideNav = {
    path: [RoutePath.teachers],
    label: 'Teacher',
    icon: <DeploymentUnitOutlined />,
    hideLinkInBreadcrumb: true,
    subNav: [
        { path: [''], label: 'Teacher List', icon: <TeamOutlined /> }
    ]
}
const overview: SideNav = {
    path: [],
    label: 'Overview',
    icon: <DashboardOutlined />
}

const messages: SideNav = {
    path: [RoutePath.message],
    label: 'Message',
    icon: <MessageOutlined />
}

export const routes: Map<Role, SideNav[]> = new Map([
    [Roles.manager, [overview, students, teachers, courses, messages]],
]);