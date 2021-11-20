import { Steps, Result, Button } from "antd";
import { useState } from "react";
import AppLayout from "../../../../component/Layout/layout";
import AddCourseForm from "../../../../component/courses/addCourseForm";
import EditCourseForm from "../../../../component/courses/updateChapterForm";
import { CourseData } from "../../../../services/models/courses";
import { useRouter } from "next/router";
import { useRole } from "../../../../services/custom-hook";

const { Step } = Steps;

export default function AddCourse() {
  const [current, setCurrent] = useState(0);
  const [courseId, setCourseId] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const router = useRouter();

  const moveToNext = () => {
    setCurrent(current + 1);
  };

  const content = [
    <AddCourseForm
      onSuccess={(course: CourseData) => {
        setCourseId(course.id);
        setScheduleId(course.scheduleId);
        moveToNext();
      }}
    />,
    <EditCourseForm
      courseId={courseId}
      scheduleId={scheduleId}
      onSuccess={moveToNext}
    />,
    <Result
      status="success"
      title="Successfully Create Course!"
      extra={[
        <Button
          type="primary"
          key="detail"
          onClick={() =>
            router.push(`/dashboard/${useRole()}/courses/${courseId}`)
          }
        >
          Go Course
        </Button>,
        <Button
          key="again"
          onClick={() => {
            router.reload();
          }}
        >
          Create Again
        </Button>,
      ]}
    />,
  ];

  return (
    <AppLayout>
      <Steps current={current} type="navigation" style={{ margin: "20px 0" }}>
        <Step title="Course Detail" />
        <Step title="Course Schedule" />
        <Step title="Success" />
      </Steps>
      {content[current]}
    </AppLayout>
  );
}
