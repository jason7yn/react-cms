import {
  Row,
  Col,
  Button,
  Input,
  Table,
  Space,
  Popconfirm as Pop,
  Spin
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback } from "react";
import AppLayout from "../../../component/Layout/layout";
import { formatDistanceToNow } from "date-fns";
import ModalForm from "../../../component/students/modalForm";
import apiService from "../../../services/api-service";
import { throttle } from "lodash";
import { useRouter } from "next/router";
const { Search } = Input;
import Link from "next/link";

export default function Student() {
  const router = useRouter();
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
      render: (text, record) => (
        <Link href={`/dashboard/students/${record.id}`}>{text}</Link>
      )
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
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                setVisibility(true);
                setFormValues({
                  type: "Edit",
                  student: record
                });
              }}
            >
              Edit
            </a>
            <Pop
              title="Are you sure to delete?"
              okText="Confirm"
              onConfirm={() => {
                apiService.deleteStudent(`students/${record.id}`).then(() => {
                  setStudentData({
                    ...studentData,
                    students: studentData.students.filter(
                      student => student.id != record.id
                    )
                  });
                });
              }}
            >
              <a>Delete</a>
            </Pop>
          </Space>
        );
      }
    }
  ];
  const [studentData, setStudentData] = useState({});
  const [page, setPage] = useState({ currentPage: 1, pageSize: 20 });
  const [visibility, setVisibility] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiService
      .getStudent({ page: `${page.currentPage}`, limit: `${page.pageSize}` })
      .then(res => {
        setStudentData(res.data);
      });
  }, [page]);

  const searchStudent = useCallback(
    throttle(e => {
      let name = e.target.value;
      setLoading(true);
      apiService
        .getStudent(
          name
            ? { limit: "20", page: "1", query: `${name}` }
            : { limit: "20", page: "1" }
        )
        .then(res => {
          setLoading(false);
          setStudentData(res.data);
        });
    }, 3000),
    []
  );
  return (
    <div className="student-list-wrapper">
      <Row justify="space-between" className="student-list-header">
        <Col span={8}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setVisibility(true);
              setFormValues({
                type: "Add",
                student: {
                  name: "",
                  country: "",
                  email: "",
                  type: ""
                }
              });
            }}
          >
            Add
          </Button>
          <ModalForm
            visible={visibility}
            cancel={() => {
              setVisibility(false);
            }}
            formValues={formValues}
            update={record => {
              setStudentData({
                ...studentData,
                students: studentData.students.map(student => {
                  if (student.id == record.id) {
                    return record;
                  } else {
                    return student;
                  }
                })
              });
            }}
          />
        </Col>
        <Col span={6}>
          <Search placeholder="Search by name" onChange={searchStudent} />
        </Col>
      </Row>
      <Col span={24}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={studentData.students}
            pagination={{
              pageSize: page.pageSize,
              showSizeChanger: true,
              onChange: (current, pageSize) => {
                setPage({ currentPage: current, pageSize: pageSize });
              },
              total: `${studentData.total}`
            }}
          />
        </Spin>
      </Col>
    </div>
  );
}
