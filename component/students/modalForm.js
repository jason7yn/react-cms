import { Modal, Button, Form, Select, Input, message } from "antd";
import { useState, useEffect } from "react";
import apiService from "../../services/api-service";
const { Option } = Select;
export default function ModalForm(props) {
  const { visible, cancel, formValues, update } = props;
  const [form] = Form.useForm();
  const { type, student } = formValues;
  useEffect(() => {
    form.setFieldsValue({
      name: type == "Edit" ? student.name : "",
      email: type == "Edit" ? student.email : "",
      country: type == "Edit" ? student.country : "",
      type: ""
    });
  });
  const handleFormSubmit = () => {
    //tester = 1 developer = 2
    form.validateFields().then(values => {
      if (formValues.type == "Add") {
        apiService
          .addStudent({ ...values, type: values.type == "tester" ? 1 : 2 })
          .then(() => {
            cancel();
            message.success("success");
          })
          .catch(error => console.log(error));
      } else {
        apiService
          .updateStudent({
            ...values,
            type: values.type == "tester" ? 1 : 2,
            id: student.id
          })
          .then(() => {
            cancel();
            console.log({
              ...student,
              ...values,
              type: values.type == "tester" ? 1 : 2
            });
            update({
              ...student,
              ...values,
              type: values.type == "tester" ? 1 : 2
            });
            message.success("success");
          })
          .catch(error => console.log(error));
      }
    });
  };
  return (
    <Modal
      visible={visible}
      onCancel={cancel}
      destroyOnClose={true}
      title={`${formValues.type} Student`}
      footer={[
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          onClick={handleFormSubmit}
        >
          {formValues.type == "Add" ? "Add" : "Update"}
        </Button>,
        <Button key="cancel" type="default" onClick={cancel}>
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
