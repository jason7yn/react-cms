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
import { debounce, throttle } from "lodash";

const { Search } = Input;

export default function Student() {
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
            <Pop
              title="Are you sure to delete?"
              okText="Confirm"
              onConfirm={() => {
                deleteStudent(record);
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
    console.log("executed");
  }, []);
  useEffect(() => {
    apiService
      .getStudent({ page: `${page.currentPage}`, limit: `${page.pageSize}` })
      .then(res => {
        setStudentData(res.data);
      });
  }, [page]);

  const handlePageChange = (current, pageSize) => {
    setPage({ currentPage: current, pageSize: pageSize });
  };
  const addStudent = () => {
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
  };
  const editStudent = record => {
    setVisibility(true);
    setFormValues({
      type: "Edit",
      student: record
    });
  };
  const deleteStudent = record => {
    apiService
      .deleteStudent(`students/${record.id}`)
      .then(() => {
        setStudentData({
          ...studentData,
          students: studentData.students.filter(
            student => student.id != record.id
          )
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  const cancel = () => {
    setVisibility(false);
  };
  const updateRecord = record => {
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
  };
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
        })
        .catch(error => {
          console.log(error);
        });
    }, 3000),
    []
  );
  return (
    <AppLayout>
      <div className="student-list-wrapper">
        <Row justify="space-between" className="student-list-header">
          <Col span={8}>
            <Button type="primary" icon={<PlusOutlined />} onClick={addStudent}>
              Add
            </Button>
            <ModalForm
              visible={visibility}
              cancel={cancel}
              formValues={formValues}
              update={updateRecord}
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
                onChange: handlePageChange,
                total: `${studentData.total}`
              }}
            />
          </Spin>
        </Col>
      </div>
    </AppLayout>
  );
}
