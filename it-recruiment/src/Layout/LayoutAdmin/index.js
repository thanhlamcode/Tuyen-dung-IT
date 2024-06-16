import { Button, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Content, Footer } from "antd/es/layout/layout";
import "./styles.scss";
import MenuSideBar from "../../components/MenuSideBar";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div className="admin">
        <Layout>
          <header className="header-admin">
            <div
              className={`header-left header-left${
                collapsed ? "--collapse" : ""
              }`}
            >
              <NavLink to="/admin/overview">IT Admin</NavLink>
            </div>
            <div className="header-right">
              <div className="collapse">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </div>
              <div className="btn">
                <Button icon={<HomeOutlined />}>
                  <NavLink to="/admin/overview">Trang chủ</NavLink>
                </Button>
                <Button icon={<LogoutOutlined />}>Đăng xuất</Button>
              </div>
            </div>
          </header>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme="light"
              style={{
                background: "#F5F5F5",
              }}
            >
              <div className={`menu${collapsed ? "--collapse" : ""}`}>
                <MenuSideBar />
              </div>
            </Sider>
            <Content className="content">
              <Outlet />
            </Content>
          </Layout>
          <Footer className="footer" theme="light">
            Copyright @ 2024 TopDev
          </Footer>
        </Layout>
      </div>
    </>
  );
}

export default LayoutAdmin;
