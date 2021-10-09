import { Modal, Form, Input, Button, Select, message } from "antd";
const { Option } = Select;
import { useState, useEffect } from "react";
import apiService from "../../services/api-service";

export default function PopUpModal(props) {
  const [visibility, setVisibility] = useState(props.modalProps.visibility);
  const [form] = Form.useForm();
  const [defaultValue, setDefaultValue] = useState({});
  const record = props.modalProps.record ? props.modalProps.record : {};
  useEffect(() => {
    setVisibility(props.modalProps.visibility);
    if (props.modalProps.type == "Add") {
      setDefaultValue({
        name: "",
        email: "",
        country: "",
        buttonText: "Add",
      });
    } else
      setDefaultValue({
        name: record.name,
        email: record.email,
        country: record.country,
        buttonText: "Update",
      });
  }, [props.counter]);
  const handleCancel = () => {
    setVisibility(false);
  };
  const handleFormSubmit = () => {
    //tester = 1 developer = 2
    form.validateFields().then((values) => {
      if (props.modalProps.type == "Add") {
        apiService
          .addStudent({ ...values, type: values.type == "tester" ? 1 : 2 })
          .then(() => {
            setVisibility(false);
            message.success("success");
          })
          .catch((error) => console.log(error));
      } else {
        apiService
          .updateStudent({
            ...values,
            type: values.type == "tester" ? 1 : 2,
          })
          .then(() => {
            setVisibility(false);
            message.success("success");
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <Modal
      visible={visibility}
      title={`${props.modalProps.type} Student`}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={[
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          onClick={handleFormSubmit}
        >
          {defaultValue.buttonText}
        </Button>,
        <Button key="cancel" type="default" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form labelCol={{ span: 6 }} form={form}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="student name" defaultValue={defaultValue.name} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true },
            { type: "email", message: `'email' is not valid email` },
          ]}
        >
          <Input placeholder="email" defaultValue={defaultValue.email} />
        </Form.Item>
        <Form.Item label="Area" name="country" rules={[{ required: true }]}>
          <Select defaultValue={defaultValue.country}>
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
          <Select defaultValue="">
            <Option value="tester">Tester</Option>
            <Option value="developer">Developer</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
