import { PropsWithChildren } from "react";
import { Card, Col, Row } from "antd";
import { HeartFilled, UserOutlined } from "@ant-design/icons";
import { CourseData } from "../../services/models/courses";
import { CardProps } from "antd/lib/card";

export default function CourseCard(
  props: PropsWithChildren<CourseData> & { cardProps?: CardProps }
): JSX.Element {
  return (
    <Card
      cover={
        <img alt="course cover" src={props.cover} style={{ height: "220px" }} />
      }
      {...props.cardProps}
      style={{ lineHeight: "1.7" }}
    >
      <Row>
        <h3>{props.name}</h3>
      </Row>
      <Row
        justify="space-between"
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <Col>{props.startTime}</Col>
        <Col>
          <HeartFilled style={{ color: "red", marginRight: "5px" }} />
          <strong>{props.star}</strong>
        </Col>
      </Row>
      <Row
        justify="space-between"
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <Col>Duration:</Col>
        <Col>
          <strong>{`${props.duration} years`}</strong>
        </Col>
      </Row>
      <Row
        justify="space-between"
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <Col>Teacher:</Col>
        <Col>
          {props.teacherName}
          {/* <Link href="/dashboard/manager">{props.teacherName}</Link> */}
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
