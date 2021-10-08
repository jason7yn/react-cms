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
  message
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import apiService from "../../../services/api-service";
import { useState, useEffect } from "react";
import AppLayout from "../../../component/Layout/layout";
import { formatDistanceToNow } from "date-fns";
const { Search } = Input;
const { Option } = Select;

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
    sorter: (a, b) => {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    },
    render: text => <a>{text}</a>
  },
  {
    key: "area",
    title: "Area",
    dataIndex: "country",
    width: "10%",
    filters: [
      {
        text: "China",
        value: "China"
      },
      {
        text: "New Zealand ",
        value: "New Zealand"
      },
      {
        text: "Canada",
        value: "Canada"
      },
      {
        text: "Australia",
        value: "Australia"
      }
    ],
    onFilter: (value, record) => record.country.indexOf(value) === 0
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email"
  },
  {
    key: "curriculum",
    title: "Selected Curriculum",
    dataIndex: "courses",
    width: "25%",
    render: courses =>
      courses.map((course, index) => {
        if (index < courses.length - 1) {
          return `${course.name},`;
        } else {
          return `${course.name}`;
        }
      })
  },
  {
    key: "type",
    title: "Student Type",
    dataIndex: "type",
    filters: [
      {
        text: "developer",
        value: "developer"
      },
      {
        text: "tester",
        value: "tester"
      }
    ],
    onFilter: (value, record) => record.type.name.indexOf(value) === 0,
    render: type => (type ? type["name"] : "")
  },
  {
    key: "join",
    title: "Join Time",
    dataIndex: "createdAt",
    render: value => formatDistanceToNow(new Date(value), { addSuffix: true })
  },
  {
    title: "Action",
    key: "operation",
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    )
  }
];

export default function Student() {
  const [studentData, setStudentData] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, pageSize: 20 });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    apiService
      .get(`students?page=${page.currentPage}&limit=${page.pageSize}`)
      .then(res => {
        setStudentData(res.data);
      });
  }, [page]);

  const handlePageChange = (current, pageSize) => {
    setPage({ currentPage: current, pageSize: pageSize });
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleFormSubmit = () => {
    //tester = 1 developer = 2
    form.validateFields().then(values => {
      apiService
        .addStudent({ ...values, type: values.type == "tester" ? 1 : 2 })
        .then(() => {
          setVisible(false);
          message.success("success");
        })
        .catch(error => console.log(error));
    });
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
              onCancel={handleCancel}
              destroyOnClose={true}
              footer={[
                <Button
                  key="submit"
                  htmlType="submit"
                  type="primary"
                  onClick={handleFormSubmit}
                >
                  Add
                </Button>,
                <Button key="cancel" type="default" onClick={handleCancel}>
                  Cancel
                </Button>
              ]}
            >
              <Form labelCol={{ span: 6 }} form={form}>
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
                  rules={[
                    { required: true },
                    { type: "email", message: `'email' is not valid email` }
                  ]}
                >
                  <Input placeholder="email" defaultValue="" />
                </Form.Item>
                <Form.Item
                  label="Area"
                  name="country"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="China">China</Option>
                    <Option value="New Zealand">New Zealand</Option>
                    <Option value="Canada">Canada</Option>
                    <Option value="Australia">Australia</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Student Type"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="tester">Tester</Option>
                    <Option value="developer">Developer</Option>
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
              total: `${studentData.total}`
            }}
          />
        </Col>
      </div>
    </AppLayout>
  );
}
