import { Modal, Form, Input, Button, Select } from "antd";
const { Option } = Select;
import { useState, useEffect } from "react";
// component is unfinshed
export default function PopUpModal(props) {
  const [visible, setVisible] = useState(props.visibility);
  useEffect(() => {
    setVisible(props.visibility);
  }, [visible]);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setVisible(false);
  };
  const handleFormSubmit = () => {
    //tester = 1 developer = 2
    form.validateFields().then(values => {
      apiService
        .addStudent({ ...values, type: values.type == "tester" ? 1 : 2 })
        .then(() => {
          setVisible(false);
          message.success("success");
        })
        .catch(error => console.log(error));
    });
  };
  return (
    <Modal
      visible={visible}
      title="Add Student"
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={[
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          onClick={handleFormSubmit}
        >
          Add
        </Button>,
        <Button key="cancel" type="default" onClick={handleCancel}>
          Cancel
        </Button>
      ]}
    >
      <Form labelCol={{ span: 6 }} form={form}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="student name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true },
            { type: "email", message: `'email' is not valid email` }
          ]}
        >
          <Input placeholder="email" defaultValue="" />
        </Form.Item>
        <Form.Item label="Area" name="country" rules={[{ required: true }]}>
          <Select>
            <Option value="China">China</Option>
            <Option value="New Zealand">New Zealand</Option>
            <Option value="Canada">Canada</Option>
            <Option value="Australia">Australia</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Student Type"
          name="type"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="tester">Tester</Option>
            <Option value="developer">Developer</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
