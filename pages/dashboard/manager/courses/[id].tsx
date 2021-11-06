import AppLayout from "../../../../component/Layout/layout";
import CourseCard from "../../../../component/courses/courseCard";
import { Col, Row, Card } from "antd";
import { useState, useEffect, PropsWithChildren } from "react";
import { CourseDetail } from "../../../../services/models/courses";
import apiService from "../../../../services/api-service";
import { useRouter } from "next/router";

export default function Details(props: PropsWithChildren<any>) {
  const [data, setData] = useState<CourseDetail>();
  const router = useRouter();

  useEffect(() => {
    apiService.getCourseById({ id: router.query.id }).then((res) => {
      setData(res.data);
      console.log(data);
    });
  }, []);

  return (
    <AppLayout>
      <Row justify="space-between">
        <Col span={8}>
          <CourseCard {...data}>
            <Row>
              <Col>price</Col>
              <Col>batches</Col>
              <Col>Students</Col>
              <Col>Earnings</Col>
            </Row>
          </CourseCard>
        </Col>
        <Col span={14}>
          <Card>
            <h2>Course Detail</h2>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
}
