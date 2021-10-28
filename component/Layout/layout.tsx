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
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import apiService from "../../services/api-service";
import Link from "next/link";
import AppBreadCrumb from "./breadcrumb";
import { routes, sideNav } from "../../services/routes";
import { useRole } from "../../services/custom-hook";
import { route } from "next/dist/server/router";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
import { isEmpty } from "lodash";
import path from "path";

export default function AppLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState(["Overview"]);
  const router = useRouter();
  const role = useRole();
  const sideNav = routes.get(role);
  //get current route without query
  //search route in sideNav, if route == sideNav.path, return sideNav.subNav.label
  const getActiveRoute = () => {
    const pathname = router.pathname;
    const path = pathname.split("/");
    const query = router.query;
    if (isEmpty(query)) {
      return path;
    } else {
      path.pop();
      return path;
    }
  };
  const key = getActiveRoute();
  console.log(key);

  function renderSideMenu(sideNav: sideNav, parent = ""): JSX.Element {
    return sideNav.map((item, index) => {
      if (item.subNav) {
        return (
          <SubMenu key={`${item.label}`} icon={item.icon} title={item.label}>
            {renderSideMenu(item.subNav, item.path.join("/"))}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.label} icon={item.icon}>
            <Link href={`/dashboard/${role}/${parent}${item.path}`}>
              {item.label}
            </Link>
          </Menu.Item>
        );
      }
    });
  }
  const sideMenu = renderSideMenu(sideNav);

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
          selectedKeys={currentPath} //array
          onSelect={(status) => {
            setCurrentPath(status.keyPath);
          }}
        >
          {sideMenu}
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
          <AppBreadCrumb />
          <div
            style={{
              backgroundColor: "#fff",
              margin: "16px",
              padding: "16px",
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
