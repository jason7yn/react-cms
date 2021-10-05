import { Row, Col, Button, Input, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apiService from "../../../services/api-service";
import { useState, useEffect } from "react";
import AppLayout from "../../../component/Layout/layout";
const { Search } = Input;
const columns = [
  {
    title: "No",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: () => {},
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Area",
    dataIndex: "country",
    width: "10%",
    filters: [
      {
        text: "China",
        value: "China",
      },
      {
        text: "New Zealand ",
        value: "New Zealand",
      },
      {
        text: "Canada",
        value: "Canada",
      },
      {
        text: "Australia",
        value: "Australia",
      },
    ],
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Selected Curriculum",
    dataIndex: "courses",
    width: "25%",
    render: (courses) =>
      courses.map((course, index) => {
        if (index < courses.length - 1) {
          return `${course.name},`;
        } else {
          return `${course.name}`;
        }
      }),
  },
  {
    title: "Student Type",
    dataIndex: "type",
    filters: [
      {
        text: "developer",
        value: "developer",
      },
      {
        text: "tester",
        value: "tester",
      },
    ],
    render: (type) => (type ? type["name"] : ""),
  },
  {
    title: "Join Time",
    dataIndex: "join",
  },
  {
    title: "Action",
    key: "operation",
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function Student() {
  const [studentData, setStudentData] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, pageSize: 20 });

  useEffect(() => {
    apiService
      .get(`students?page=${page.currentPage}&limit=${page.pageSize}`)
      .then((res) => {
        setStudentData(res.data);
      });
  }, [page]);

  const handlePageChange = (current, pageSize) => {
    console.log(current, pageSize);
    setPage({ currentPage: current, pageSize: pageSize });
  };

  return (
    <AppLayout>
      <div className="student-list-wrapper">
        <Row justify="space-between" className="student-list-header">
          <Col span={8}>
            <Button type="primary" icon={<PlusOutlined />}>
              Add
            </Button>
          </Col>
          <Col span={6}>
            <Search placeholder="input search text" />
          </Col>
        </Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={studentData.students}
            pagination={{
              pageSize: page.pageSize,
              showSizeChanger: true,
              onChange: handlePageChange,
              total: `${studentData.total}`,
            }}
          />
        </Col>
      </div>
    </AppLayout>
  );
}
