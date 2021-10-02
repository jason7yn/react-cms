import { Layout, Menu, Breadcrumb, Button, Row, Col } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  DashboardOutlined,
  ReadOutlined,
  MessageOutlined,
  SolutionOutlined,
  DeploymentUnitOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileAddOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const url = "https://cms.chtoma.com/api/logout";

export default function AppLayout(props) {
  const token = JSON.parse(props.localStorage.getItem("user")).token;
  const authHeader = { Authorization: `Bearer ${token}` };
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const logout = () => {
    axios
      .post(url, {}, { headers: authHeader })
      .then(() => {
        props.localStorage.removeItem("user");
        router.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
        <div className="logo">
          <h3>CMS</h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item icon={<DashboardOutlined />}>Overview</Menu.Item>
          <SubMenu icon={<SolutionOutlined />} title="Student">
            <Menu.Item icon={<TeamOutlined />}>Student List</Menu.Item>
          </SubMenu>
          <SubMenu icon={<DeploymentUnitOutlined />} title="Teacher">
            <Menu.Item icon={<TeamOutlined />}>Teacher List</Menu.Item>
          </SubMenu>
          <SubMenu icon={<ReadOutlined />} title="Course">
            <Menu.Item icon={<ProjectOutlined />}>All Courses</Menu.Item>
            <Menu.Item icon={<FileAddOutlined />}>Add Course</Menu.Item>
            <Menu.Item icon={<EditOutlined />}>Edit Course</Menu.Item>
          </SubMenu>
          <Menu.Item icon={<MessageOutlined />}>Message</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="dashboard-header">
          <a onClick={onCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </a>

          <Row align="middle">
            <BellOutlined style={{ color: "white" }}></BellOutlined>

            <Button
              icon={<UserOutlined style={{ color: "white" }} />}
              shape="circle"
              style={{ background: "grey", marginLeft: "20px" }}
              onClick={logout}
            ></Button>
          </Row>
        </Header>
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item>CMS Manager System</Breadcrumb.Item>
            <Breadcrumb.Item>Overview</Breadcrumb.Item>
          </Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
