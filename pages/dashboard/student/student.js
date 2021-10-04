import { Row, Col, Button, Input, Table, Space } from "antd";
import apiService from "../../../services/api-service";
import { useState, useEffect } from "react";
const { Search } = Input;
const columns = [
  {
    title: "No",
    dataIndex: "id"
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: () => {}
  },
  {
    title: "Area",
    dataIndex: "country",
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
    ]
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Selected Curriculum",
    dataIndex: "curriculum"
  },
  {
    title: "Student Type",
    dataIndex: "type.name",
    filters: [
      {
        text: "developer",
        value: "developer"
      },
      {
        text: "tester",
        value: "tester"
      }
    ]
  },
  {
    title: "Join Time",
    dataIndex: "join"
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
const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    no: i,
    name: `student ${i}`,
    area: "Australia",
    email: "abc@bcd.com",
    curriculum: "Dr ABC",
    type: "developer",
    join: "over 31 years ago"
  });
}

export default function Student() {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    apiService.get("students?page=1&limit=20").then(res => {
      setStudentData(res.data.students);
    });
  }, []);

  return (
    <div className="student-list-wrapper">
      <Row justify="space-between">
        <Col>
          <Button type="primary"> + Add</Button>
        </Col>
        <Col span={6}>
          <Search placeholder="input search text" />
        </Col>
      </Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={studentData}
          pagination={{ pageSize: 20 }}
        />
      </Col>
    </div>
  );
}
