import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Layout,
  Row,
  Col,
  Typography
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function() {
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  return (
    <Layout>
      <Header></Header>
      <Content className="login-page-content">
        <h1 className="login-form-title">COURSE MANAGEMENT ASSISTANT</h1>
        <Row className="wrapper-row">
          <Col className="wrapper-col" span={8}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                requiredRoleValue: "student",
                remember: true
              }}
              onFinish={onFinish}
            >
              <Form.Item name="requiredRoleValue">
                <Radio.Group>
                  <Radio.Button value="student">Student</Radio.Button>
                  <Radio.Button value="teacher">Teacher</Radio.Button>
                  <Radio.Button value="manager">Manager</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "'email' is required"
                  },
                  {
                    type: "email",
                    message: "'email' is not a valid email"
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Please input email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input password" }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Please input password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sign in
                </Button>
                No account? <a href="">Sign up</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
