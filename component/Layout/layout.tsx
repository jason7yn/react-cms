import { Layout, Menu, Badge, Row, Dropdown, Avatar, Col } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState, PropsWithChildren, useCallback } from "react";
import apiService from "../../services/api-service";
import Link from "next/link";
import AppBreadCrumb from "./breadcrumb";
import { routes, SideNav } from "../../services/routes";
import { useRole } from "../../services/custom-hook";
import { getActiveKey } from "../../services/side-menu";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function AppLayout(props: PropsWithChildren<any>) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const role = useRole();
  const sideNav = routes.get(role);
  const key = getActiveKey(sideNav, router.pathname, router.query);
  const defaultSelectedKeys = [key.split("/").pop()];
  const defaultOpenKeys = key.split("/").slice(0, -1);

  const renderSideMenu = useCallback(
    (sideNav: SideNav[], parent = ""): JSX.Element[] => {
      return sideNav.map((item) => {
        if (item.subNav) {
          return (
            <SubMenu key={`${item.label}`} icon={item.icon} title={item.label}>
              {renderSideMenu(item.subNav, item.path.join(""))}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.label} icon={item.icon}>
              {/* remove empty items, use join to convert array to string */}
              <Link
                href={["/dashboard", role, parent, item.path]
                  .filter((item) => !!item)
                  .join("/")}
              >
                {item.label}
              </Link>
            </Menu.Item>
          );
        }
      });
    },
    [role]
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        className="sider"
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
        style={{ height: "inherit" }}
      >
        <div className="logo">
          <h3>CMS</h3>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
        >
          {renderSideMenu(sideNav)}
        </Menu>
      </Sider>

      <Layout id="contentLayout">
        <Header className="dashboard-header">
          <a
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </a>

          <Row align="middle">
            <Col span={8}>
              <Badge count={33} offset={[13, 18]}>
                <BellOutlined
                  style={{ fontSize: 25, marginTop: 20, color: "white" }}
                />
              </Badge>
            </Col>
            <Col span={8}>
              <Dropdown
                overlay={
                  <Menu
                    onClick={() => {
                      apiService.logout().then(() => {
                        localStorage.removeItem("user");
                        router.push("/");
                      });
                    }}
                  >
                    <Menu.Item key="1" icon={<LogoutOutlined />}>
                      Logout
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar style={{ marginLeft: "2em" }} icon={<UserOutlined />} />
              </Dropdown>
            </Col>
          </Row>
        </Header>

        <AppBreadCrumb />

        <Content
          style={{
            backgroundColor: "#fff",
            margin: "16px",
            padding: "16px",
            minHeight: "auto",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
