import { PropsWithChildren } from "react";
import { Card, Col, Row } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { CourseData } from "../../services/models/courses";
import Link from "next/link";

export default function CourseCard(props: PropsWithChildren<CourseData>): JSX.Element {
  return (
    <Card
      cover={
        <img alt="course cover" src={props.cover} style={{ height: "220px" }} />
      }

    >
      <Row>
        <h3>{props.name}</h3>
      </Row>
      <Row justify="space-between" style={{ borderBottom: "1px solid grey" }}>
        <Col>{props.startTime}</Col>
        <Col>
          <HeartFilled style={{ color: "red", marginRight: "5px" }} />
          <strong>{props.star}</strong>
        </Col>
      </Row>
      <Row justify="space-between" style={{ borderBottom: "1px solid grey" }}>
        <Col>Duration:</Col>
        <Col>
          <strong>{`${props.duration} years`}</strong>
        </Col>
      </Row>
      <Row justify="space-between" style={{ borderBottom: "1px solid grey" }}>
        <Col>Teacher:</Col>
        <Col>
          <Link href="/dashboard/manager">{props.teacherName}</Link>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <UserOutlined style={{ color: "#1890ff", marginRight: "5px" }} />
          Student limit
        </Col>
        <Col>{props.maxStudents}</Col>
      </Row>
      {props.children}
    </Card>
  );
}
