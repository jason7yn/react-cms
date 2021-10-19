import AppLayout from "../../../component/Layout/layout";
import { Row, Col, Card, Avatar, Typography, Space, Tag, Table } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiService from "../../../services/api-service";
const { Title } = Typography;
import Link from "next/link";
//output: detail page
//side effect: fetch student detail from server

//state: tab toggle, student detail
export default function Details() {
  const router = useRouter();
  const [studentDetail, setStudentDetail] = useState({});
  useEffect(() => {
    apiService.getStudentById(router.query.id).then(res => {
      setStudentDetail(res.data);
    });
  }, []);
  const [tab, setTab] = useState({ key: "about" });
  const tagColor = ["magenta", "red", "volcano", "orange", "gold"];
  const tabList = [
    {
      key: "about",
      tab: "About"
    },
    {
      key: "course",
      tab: "Courses"
    }
  ];
  const columns = [
    {
      title: "No",
      key: "no",
      render: (arg1, arg2, index) => index + 1
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",

      render: (text, record) => (
        <Link href={`/dashboard/courses/${record.id}`}>{text}</Link>
      )
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: type => {
        if (type.length !== 0) {
          return type.map((element, index) => {
            if (index < type.length - 1) {
              return `${element.name},`;
            } else {
              return `${element.name}`;
            }
          });
        } else {
          return "";
        }
      }
    },
    {
      title: "Join Time",
      key: "join",
      dataIndex: "createdAt"
    }
  ];
  const tabListContent = {
    about: (
      <Typography>
        <Title level={2}>Information</Title>
        <Space direction="vertical" size={6}>
          <Col span={24}>
            <b style={{ display: "inline-block", minWidth: "150px" }}>
              Education:
            </b>
            <span>{studentDetail.education}</span>
          </Col>
          <Col span={24}>
            <b style={{ display: "inline-block", minWidth: "150px" }}>Area</b>
            <span>{studentDetail.country}</span>
          </Col>
          <Col span={24}>
            <b style={{ display: "inline-block", minWidth: "150px" }}>
              Gender:
            </b>
            <span>{studentDetail.gender == "1" ? "Male" : "Female"}</span>
          </Col>
          <Col span={24}>
            <b style={{ display: "inline-block", minWidth: "150px" }}>
              Member Period:
            </b>
            <span>{studentDetail.memberStartAt}</span>
            <span> - </span>
            <span>{studentDetail.memberEndAt}</span>
          </Col>
          <Col span={24}>
            <b style={{ display: "inline-block", minWidth: "150px" }}>Type:</b>
            <span>{studentDetail.type ? studentDetail.type.name : ""}</span>
          </Col>
          <Col span={24}>
            <b style={{ display: "inline-block", minWidth: "150px" }}>
              Create Time:
            </b>
            <span>{studentDetail.createdAt}</span>
          </Col>
          <Col span={24}>
            <b style={{ display: "inline-block", minWidth: "150px" }}>
              Update Time:
            </b>
            <span>{studentDetail.updatedAt}</span>
          </Col>
        </Space>

        <Title level={2}>Interesting</Title>
        <Space direction="horizontal">
          {studentDetail.interest
            ? studentDetail.interest.map((element, index) => {
                return <Tag color={tagColor[index]}>{element}</Tag>;
              })
            : ""}
        </Space>
        <Title level={2}>Description</Title>
        {studentDetail.description}
      </Typography>
    ),
    course: <Table columns={columns} dataSource={studentDetail.courses} />
  };

  return (
    <Row justify="space-around">
      <Col span={8}>
        <Card
          title={
            <Col span={8} offset={7}>
              <Avatar size={120} src={studentDetail.avatar} />
            </Col>
          }
        >
          <Row style={{ textAlign: "center" }}>
            <Col span={12}>
              <b>Name:</b>
              <p>{studentDetail.name}</p>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <b>Age:</b>
              <p>{studentDetail.age}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "center" }}>
              <b>Email:</b>
              <p>{studentDetail.email}</p>
            </Col>
            <Col span={12} style={{ textAlign: "center" }}>
              <b>Phone:</b>
              <p>{studentDetail.phone}</p>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <b>Address:</b>
              <p>{studentDetail.address}</p>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={14}>
        <Card
          tabList={tabList}
          activeTabKey={tab.key}
          onTabChange={key => setTab({ key: key })}
        >
          {tabListContent[tab.key]}
        </Card>
      </Col>
    </Row>
  );
}
