import { Row, Col, Button, Input, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import AppLayout from "../../../component/Layout/layout";
import { formatDistanceToNow } from "date-fns";
import PopUpModal from "../../../component/students/popUpModal";
import apiService from "../../../services/api-service";
const { Search } = Input;

export default function Student() {
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
      sorter: (a, b) => {
        if (a.name < b.name) {
          return -1;
        } else {
          return 1;
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
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                editStudent(record);
              }}
            >
              Edit
            </a>
            <a>Delete</a>
          </Space>
        );
      },
    },
  ];

  const [studentData, setStudentData] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, pageSize: 20 });
  const [count, setCount] = useState(0);
  const [modalProps, setModalProps] = useState({ visibility: false });

  useEffect(() => {
    apiService
      .get(`students?page=${page.currentPage}&limit=${page.pageSize}`)
      .then((res) => {
        setStudentData(res.data);
      });
  }, [page]);

  const handlePageChange = (current, pageSize) => {
    setPage({ currentPage: current, pageSize: pageSize });
  };
  const addStudent = () => {
    setCount(count + 1);
    setModalProps({
      type: "Add",
      visibility: true,
    });
  };
  const editStudent = (record) => {
    setCount(count + 1);
    setModalProps({
      type: "Edit",
      visibility: true,
      record: record,
    });
  };
  return (
    <AppLayout>
      <div className="student-list-wrapper">
        <Row justify="space-between" className="student-list-header">
          <Col span={8}>
            <Button type="primary" icon={<PlusOutlined />} onClick={addStudent}>
              Add
            </Button>
            <PopUpModal counter={count} modalProps={modalProps} />
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
