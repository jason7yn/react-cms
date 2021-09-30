import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  DesktopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const url = "https://cms.chtoma.com/api/logout";

export default function DashBoard() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const onCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const logout = () => {
    // post logout api attach token in request header
    //clear localStorage
    router.push("/");
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
        <div className="logo"></div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item>Overview</Menu.Item>
          <Menu.Item>Student</Menu.Item>
          <Menu.Item>Teacher</Menu.Item>
          <Menu.Item>Course</Menu.Item>
          <Menu.Item>Message</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: onCollapsed
            }
          )}
          <BellOutlined style={{ color: "white" }}></BellOutlined>
          <Button
            icon={<UserOutlined style={{ color: "white" }} />}
            shape="circle"
            style={{ background: "grey" }}
            onClick={logout}
          ></Button>
        </Header>
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item>CMS Manager System</Breadcrumb.Item>
            <Breadcrumb.Item>Overview</Breadcrumb.Item>
          </Breadcrumb>
          <div>Statistics</div>
        </Content>
      </Layout>
    </Layout>
  );
}
