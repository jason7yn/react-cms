import {
  Layout,
  Menu,
  Breadcrumb,
  Badge,
  Row,
  Dropdown,
  Avatar,
  Col,
} from "antd";
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
  LogoutOutlined,
} from "@ant-design/icons";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";
import apiService from "../../services/api-service";
import Link from "next/link";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function AppLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
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
  //dashboard-->CMS MANAGER(ROLE) SYSTEM/Overview
  //students -->CMS MANAGER SYSTEM / STUDENT / STUDENTLIST

  const generateBread = () => {
    let pathName = router.pathname;
    const paths = pathName.split("/").filter((i) => i);
    const breadcrumbItem = [];
    paths.map((path) => {
      if (path == "dashboard") {
        breadcrumbItem.push(
          <BreadcrumbItem>CMS MANAGER SYSTEM</BreadcrumbItem>
        );
        breadcrumbItem.push(<BreadcrumbItem>Overview</BreadcrumbItem>);
      } else if (path == "students") {
        breadcrumbItem.push(<BreadcrumbItem>Student</BreadcrumbItem>);
        breadcrumbItem.push(<BreadcrumbItem>Student List</BreadcrumbItem>);
      }
    });
    return breadcrumbItem;
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
        <div className="logo">
          <h3>CMS</h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link href="/dashboard">Overview</Link>
          </Menu.Item>
          <SubMenu key="student" icon={<SolutionOutlined />} title="Student">
            <Menu.Item key="student1" icon={<TeamOutlined />}>
              <Link href="/dashboard/students">Student List</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="teacher"
            icon={<DeploymentUnitOutlined />}
            title="Teacher"
          >
            <Menu.Item key="teacher1" icon={<TeamOutlined />}>
              Teacher List
            </Menu.Item>
          </SubMenu>
          <SubMenu key="course" icon={<ReadOutlined />} title="Course">
            <Menu.Item key="course1" icon={<ProjectOutlined />}>
              All Courses
            </Menu.Item>
            <Menu.Item key="course2" icon={<FileAddOutlined />}>
              Add Course
            </Menu.Item>
            <Menu.Item key="course3" icon={<EditOutlined />}>
              Edit Course
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<MessageOutlined />}>
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
          <Breadcrumb>{generateBread()}</Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
