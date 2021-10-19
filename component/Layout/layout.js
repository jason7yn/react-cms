import { Layout, Menu, Badge, Row, Dropdown, Avatar, Col } from "antd";
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
  EditOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import apiService from "../../services/api-service";
import Link from "next/link";
//import { keyPathContext } from "../../services/context";
import AppBreadCrumb from "../Layout/breadcrumb";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function AppLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [keyPath, setKeyPath] = useState(["Overview"]);
  console.log("current keyPath state: ", keyPath);

  const router = useRouter();

  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const logout = () => {
    apiService.logout().then(() => {
      localStorage.removeItem("user");
      router.push("/");
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
        <div className="logo">
          <h3>CMS</h3>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={keyPath}
          onSelect={status => {
            setKeyPath(status.keyPath);
          }}
        >
          <Menu.Item key="Overview" icon={<DashboardOutlined />}>
            <Link href="/dashboard">Overview</Link>
          </Menu.Item>
          <SubMenu key="Student" icon={<SolutionOutlined />} title="Student">
            <Menu.Item key="Student List" icon={<TeamOutlined />}>
              <Link href="/dashboard/students">Student List</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="Teacher"
            icon={<DeploymentUnitOutlined />}
            title="Teacher"
          >
            <Menu.Item key="Teacher List" icon={<TeamOutlined />}>
              Teacher List
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Course" icon={<ReadOutlined />} title="Course">
            <Menu.Item key="All Courses" icon={<ProjectOutlined />}>
              All Courses
            </Menu.Item>
            <Menu.Item key="Add Course" icon={<FileAddOutlined />}>
              Add Course
            </Menu.Item>
            <Menu.Item key="Edit Course" icon={<EditOutlined />}>
              Edit Course
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="Message" icon={<MessageOutlined />}>
            Message
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="dashboard-header">
          <a onClick={onCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </a>

          <Row align="middle" justify="space-around">
            <Col span={12} offset={-2}>
              <Badge count={33}>
                <BellOutlined style={{ fontSize: 26, color: "white" }} />
              </Badge>
            </Col>
            <Col span={12}>
              <Dropdown
                overlay={
                  <Menu onClick={logout}>
                    <Menu.Item key="1" icon={<LogoutOutlined />}>
                      Logout
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar icon={<UserOutlined />} />
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content>
          <AppBreadCrumb keyPath={keyPath} />
          <div
            style={{
              backgroundColor: "#fff",
              margin: "16px",
              padding: "16px"
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
