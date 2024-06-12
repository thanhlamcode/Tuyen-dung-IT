import { Layout } from "antd";
import "./styles.scss";
import { Link, Outlet } from "react-router-dom";
import logo from "../../../src/image/snoopy.webp";

const { Footer, Content } = Layout;

function LayoutDefault() {
  return (
    <>
      <Layout>
        <header className="header">
          <div className="header__left">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="header__right">
            <Link to="login">
              <button className="btn-dn">Đăng nhập</button>
            </Link>
            <Link to="register">
              <button className="btn-dk">Đăng ký</button>
            </Link>
          </div>
        </header>
        <Content>
          <Outlet />
        </Content>
        <Footer className="footer">Copyright @ TopCV 2024</Footer>
      </Layout>
    </>
  );
}

export default LayoutDefault;
