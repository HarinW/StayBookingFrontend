import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";

const { Header, Content } = Layout;

class App extends React.Component {
  state = {
    // default state of user
    authed: false,
    asHost: false,
  };

  componentDidMount() {
    // check if user is logged in
    const authToken = localStorage.getItem("authToken"); // localStorage is a browser API，used to store data in the browser
    const asHost = localStorage.getItem("asHost") === "true"; // localStorage stores data as strings, so we need to convert it to boolean
    this.setState({
      authed: authToken !== null,
      asHost, // asHost: asHost
    });
  }

  // modify the state in App component
  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost);
    this.setState({
      authed: true,
      asHost,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }

    if (this.state.asHost) {
      return <div>host home page</div>;
    }

    return <div>guest home page</div>;
  };

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  // layout of the page
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          {/* flex layout: align items in a row */}
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            Stays Booking
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }} // 64: antd header height
        >
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default App;
