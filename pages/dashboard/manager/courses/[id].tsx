import AppLayout from "../../../../component/Layout/layout";
import CourseCard from "../../../../component/courses/courseCard";
import { Col, Row, Card, Badge, Steps, Table, Tag, Collapse } from "antd";
import { useState, useEffect, PropsWithChildren } from "react";
import {
  CourseDetail,
  Schedule,
  CourseStatusColor,
  CourseStatusText,
  weekdays,
} from "../../../../services/models/courses";
import apiService from "../../../../services/api-service";
import { useRouter } from "next/router";

export default function Details(props: PropsWithChildren<any>) {
  const [data, setData] = useState<CourseDetail>();
  const router = useRouter();
  const [sales, setSales] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [classTime, setClassTime] = useState([]);

  const columns = weekdays.map((item) => {
    return {
      title: item,
      dataIndex: item,
    };
  });

  const getChapterExtra = (source: Schedule, index: number) => {
    const activeIndex = source.chapters.findIndex(
      (item) => item.id === source.current
    );
    const status = index === activeIndex ? 1 : index < activeIndex ? 0 : 2;

    return (
      <Tag color={CourseStatusColor[status]}>{CourseStatusText[status]}</Tag>
    );
  };

  useEffect(() => {
    apiService.getCourseById({ id: router.query.id }).then((res) => {
      const data = res.data;
      if (data) {
        const info = [
          { label: "Price", value: data.sales.price },
          { label: "Batches", value: data.sales.batches },
          { label: "Students", value: data.sales.studentAmount },
          { label: "Earnings", value: data.sales.earnings },
        ];
        setSales(info);
        setData(data);
        console.log(data);
        setActiveChapterIndex(
          data.schedule.chapters.findIndex(
            (item) => item.id === data.schedule.current
          )
        );
        const classTime = {};
        data?.schedule.classTime.forEach((t) => {
          const time = t.split(" ");
          classTime[time[0]] = time[1];
        });
        setClassTime([classTime]);
      }
    });
  }, []);

  return (
    <AppLayout>
      <Row justify="space-between">
        <Col span={8}>
          <CourseCard {...data} cardProps={{ bodyStyle: { paddingBottom: 0 } }}>
            <Row id="sales-info-row" align="middle" justify="space-between">
              {sales.map((item, index) => {
                return (
                  <Col key={index} span={6} className="sales-info-col">
                    <b>{item.value}</b>
                    <p>{item.label}</p>
                  </Col>
                );
              })}
            </Row>
          </CourseCard>
        </Col>

        <Col span={15}>
          <Card>
            <h2>Course Detail</h2>

            <h3>Create Time</h3>
            <p>{data?.createdAt}</p>

            <h3>Start Time</h3>
            <p>{data?.startTime}</p>

            <Badge
              status="success"
              style={{ top: "5px", right: "-5px" }}
              dot={true}
            >
              <h3>Status</h3>
            </Badge>

            <Row className="step-row">
              <Steps
                size="small"
                current={activeChapterIndex}
                style={{ width: "auto" }}
              >
                {data?.schedule.chapters.map((item) => (
                  <Steps.Step title={item.name} key={item.id}></Steps.Step>
                ))}
              </Steps>
            </Row>

            <h3>Course Code</h3>
            <p>{data?.uid}</p>

            <h3>Class Time</h3>
            <Table
              columns={columns}
              dataSource={classTime}
              size="small"
              bordered
              pagination={false}
            ></Table>

            <h3>Category</h3>
            <Row>
              {data?.type.map((item) => (
                <Tag color={"geekblue"} key={item.id}>
                  {item.name}
                </Tag>
              ))}
            </Row>

            <h3>Description</h3>
            <p>{data?.detail}</p>

            <h3>Chapter</h3>
            <Collapse>
              {data?.schedule.chapters.map((item, index) => {
                return (
                  <Collapse.Panel
                    key={index}
                    header={item.name}
                    extra={getChapterExtra(data.schedule, index)}
                  >
                    {item.content}
                  </Collapse.Panel>
                );
              })}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
}
