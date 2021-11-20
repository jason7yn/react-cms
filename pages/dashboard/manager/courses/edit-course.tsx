import AppLayout from "../../../../component/Layout/layout";
import AddCourseForm from "../../../../component/courses/addCourseForm";
import UpdateChapterForm from "../../../../component/courses/updateChapterForm";
import { Row, Col, Select, Input, Spin, Tabs } from "antd";
import { useState, useCallback, useEffect } from "react";
import apiService from "../../../../services/api-service";
import { debounce } from "lodash";
import { CourseData } from "../../../../services/models/courses";

export default function EditCourse() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchBy, setSearchBy] = useState<"uid" | "name" | "type">("uid");
  const [searchResult, setSearchResult] = useState<CourseData[]>([]);
  const [userId, setUserId] = useState(null);
  const [course, setCourse] = useState<CourseData>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const search = useCallback(
    debounce((value: string, cb?: (courses?: CourseData[]) => void) => {
      if (!value) {
        return;
      }

      setIsSearching(true);

      apiService
        .getCourse({ [searchBy]: value, userId: userId })
        .then((res) => {
          const { data } = res;

          if (!!data) {
            setSearchResult(data.courses);
            if (!!cb) {
              cb(data.courses);
            }
          }
        })
        .finally(() => setIsSearching(false));
    }, 1000),
    [searchBy]
  );

  return (
    <AppLayout>
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <Input.Group compact size="large" style={{ display: "flex" }}>
            <Select
              defaultValue="uid"
              onChange={(value) => setSearchBy(value)}
              className="search-course-input"
            >
              <Select.Option value="uid">Code</Select.Option>
              <Select.Option value="name">Name</Select.Option>
              <Select.Option value="type">Category</Select.Option>
            </Select>

            <Select
              showSearch
              placeholder={`Search course by ${searchBy}`}
              notFoundContent={isSearching ? <Spin size="small" /> : null}
              filterOption={false}
              style={{ flex: 1 }}
              onSearch={(value) => {
                search(value);
              }}
            >
              {searchResult.map(({ id, name, teacherName, uid }) => (
                <Select.Option key={id} value={id}>
                  {name} - {teacherName} - {uid}
                </Select.Option>
              ))}
            </Select>
          </Input.Group>
        </Col>
      </Row>

      <Tabs
        renderTabBar={(props, DefaultTabBar) => <DefaultTabBar {...props} />}
        type="card"
        size="large"
        animated
      >
        <Tabs.TabPane key="course" tab="Course Detail">
          <AddCourseForm course={course} />
        </Tabs.TabPane>

        <Tabs.TabPane key="chapter" tab="Course Schedule">
          <UpdateChapterForm
            courseId={course?.id}
            scheduleId={course?.scheduleId}
            isAdd={false}
          />
        </Tabs.TabPane>
      </Tabs>
    </AppLayout>
  );
}
