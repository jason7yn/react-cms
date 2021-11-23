import {
  Row,
  Col,
  Input,
  Form,
  Button,
  message,
  Select,
  TimePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { weekdays, AddChapterFormProps } from "../../services/models/courses";
import { useState, useEffect } from "react";
import moment from "moment";
import apiService from "../../services/api-service";

export default function UpdateChapterForm({
  courseId,
  onSuccess,
  scheduleId,
  isAdd = true,
}: AddChapterFormProps) {
  const [form] = Form.useForm();
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const initialValues = {
    ["chapters"]: [{ name: "", content: "" }],
    ["classTime"]: [{ weekdays: "", time: "" }],
  };

  const onFinish = (values) => {
    const param = {
      courseId: courseId,
      scheduleId: scheduleId,
      chapters: values.chapters.map((chp, index) => {
        return { ...chp, order: index + 1 };
      }),
      classTime: values.classTime.map(({ weekdays, time }) => {
        return `${weekdays} ${moment(time).format("hh:mm:ss")}`;
      }),
    };
    apiService.updateCourse(param).then((res) => {
      onSuccess();
    });
  };
  useEffect(() => {
    (async () => {
      if (!scheduleId || isAdd) {
        return;
      }

      const { data } = await apiService.getScheduleById({ scheduleId });

      if (!!data) {
        const classTimes = data.classTime.map((item) => {
          const [weekdays, time] = item.split(" ");

          return { weekdays, time: moment(time, "hh:mm:ss") };
        });

        form.setFieldsValue({ chapters: data.chapters, classTime: classTimes });
        setSelectedWeekdays(classTimes.map((item) => item.weekday));
      }
    })();
  }, [scheduleId]);

  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      <Row gutter={[6, 16]}>
        <Col span={12}>
          <h2>Chapters</h2>

          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row gutter={20}>
                    <Col span={8}>
                      <Form.Item
                        {...field}
                        name={[field.name, "name"]}
                        fieldKey={[field.fieldKey, "name"]}
                        rules={[{ required: true }]}
                      >
                        <Input size="large" placeholder="Chapter Name" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        {...field}
                        name={[field.name, "content"]}
                        fieldKey={[field.fieldKey, "content"]}
                        rules={[{ required: true }]}
                      >
                        <Input size="large" placeholder="Chapter content" />
                      </Form.Item>
                    </Col>

                    <Col span={2}>
                      <Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(field.name);
                            } else {
                              message.warn(
                                "You must set at least one chapter."
                              );
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col span={20}>
                    <Form.Item>
                      <Button
                        size="large"
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Chapter
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>
        </Col>

        <Col span={12}>
          <h2>Class times</h2>

          <Form.List name="classTime">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row gutter={20}>
                    <Col span={8}>
                      <Form.Item
                        {...field}
                        name={[field.name, "weekdays"]}
                        fieldKey={[field.fieldKey, "weekdays"]}
                        rules={[{ required: true }]}
                      >
                        <Select
                          size="large"
                          onChange={(value: string) => {
                            setSelectedWeekdays([...selectedWeekdays, value]);
                          }}
                        >
                          {weekdays.map((day) => {
                            return (
                              <Select.Option
                                key={day}
                                value={day}
                                disabled={selectedWeekdays.includes(day)}
                              >
                                {day}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        {...field}
                        name={[field.name, "time"]}
                        fieldKey={[field.fieldKey, "time"]}
                        rules={[{ required: true }]}
                      >
                        <TimePicker size="large" style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col span={2}>
                      <Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(field.name);
                            } else {
                              message.warn(
                                "You must set at least one chapter."
                              );
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col span={20}>
                    <Form.Item>
                      <Button
                        size="large"
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Class Time
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>
        </Col>
      </Row>

      <Row>
        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Row>
    </Form>
  );
}
