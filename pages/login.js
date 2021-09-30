import { Form, Input, Button, Checkbox, Radio, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import AES from "crypto-js/aes";
import { useRouter } from "next/router";

const titleStyle = {
  textAlign: "center",
  letterSpacing: "-2px"
};
const url = "https://cms.chtoma.com/api/login";

export default function Login() {
  const router = useRouter();
  const onFinish = values => {
    const para = {
      ...values,
      password: AES.encrypt(values.password, "cms").toString()
    };
    axios
      .post(url, para)
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        router.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper-form">
      <h1 className="login-form-title" style={titleStyle}>
        COURSE MANAGEMENT ASSISTANT
      </h1>
      <Col span={8} offset={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            role: "student",
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item name="role">
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
            rules={[
              {
                required: true,
                message: "Please input password"
              },
              {
                min: 4,
                message: "password must be between 4 and 16 characters"
              },
              {
                max: 16,
                message: "password must be between 4 and 16 characters"
              }
            ]}
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
              block={true}
            >
              Sign in
            </Button>
            No account?{" "}
            <Link href="/signup">
              <a href="">Sign up</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}
