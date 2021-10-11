import { Modal, Button, Form, Select, Input } from "antd";
import { useState } from "react";
import apiService from "../../services/api-service";
const { Option } = Select;
export default function ModalForm(props) {
  const { visible, cancel, formValues } = props;
  const [form] = Form.useForm();
  const student = formValues.student;
  return (
    <Modal
      visible={visible}
      onCancel={cancel}
      destroyOnClose={true}
      title={`${formValues.type} Student`}
      footer={[
        <Button key="submit" htmlType="submit" type="primary">
          {formValues.type == "Add" ? "Add" : "Update"}
        </Button>,
        <Button key="cancel" type="default" onClick={cancel}>
          Cancel
        </Button>,
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
            { type: "email", message: `'email' is not valid email` },
          ]}
        >
          <Input placeholder="email" />
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
