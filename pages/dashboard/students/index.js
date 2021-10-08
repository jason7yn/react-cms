import {
  Row,
  Col,
  Button,
  Input,
  Table,
  Space,
  Modal,
  Form,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apiService from "../../../services/api-service";
import { useState, useEffect } from "react";
import AppLayout from "../../../component/Layout/layout";
import { formatDistanceToNow } from "date-fns";
const { Search } = Input;
const { Option } = Select;
let counter = 0;
const columns = [
  {
    title: "No",
    key: "no",
    render: (arg1, arg2, index) => index + 1,
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => {
      if (a.name < b.name) {
        return 1;
      } else {
        return -1;
      }
    },
    render: (text) => <a>{text}</a>,
  },
  {
    key: "area",
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
    onFilter: (value, record) => record.country.indexOf(value) === 0,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "curriculum",
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
    key: "type",
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
    onFilter: (value, record) => record.type.name.indexOf(value) === 0,
    render: (type) => (type ? type["name"] : ""),
  },
  {
    key: "join",
    title: "Join Time",
    dataIndex: "createdAt",
    render: (value) =>
      formatDistanceToNow(new Date(value), { addSuffix: true }),
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
  const [visible, setVisible] = useState(false);
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
  const showModal = () => {
    setVisible(true);
  };

  return (
    <AppLayout>
      <div className="student-list-wrapper">
        <Row justify="space-between" className="student-list-header">
          <Col span={8}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Add
            </Button>
            <Modal
              visible={visible}
              title="Add Student"
              footer={[
                <Button key="submit" type="primary">
                  Add
                </Button>,
                <Button key="cancel" type="default">
                  Cancel
                </Button>,
              ]}
            >
              <Form labelAlign="left">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="student name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                  label="Area"
                  name="area"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option>China</Option>
                    <Option>New Zealand</Option>
                    <Option>Canada</Option>
                    <Option>Australia</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Student Type"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option>Tester</Option>
                    <Option>Developer</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
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
