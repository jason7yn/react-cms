import {
  Form,
  Input,
  Upload,
  Row,
  Col,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Spin,
  Modal,
} from "antd";
import { InboxOutlined, KeyOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import ImgCrop from "antd-img-crop";
import { getTime } from "date-fns";
import { useEffect, useState } from "react";
import apiService from "../../services/api-service";
import { DurationUnit } from "../../services/models/courses";
import moment from "moment";
import {
  AddCourseRequest,
  AddCourseFormProps,
} from "../../services/models/courses";
import { getBase64 } from "../../library/helper";

export default function AddCourseForm({
  course,
  onSuccess,
}: AddCourseFormProps) {
  const [courseType, setCourseType] = useState<{ id: number; name: string }[]>(
    []
  );
  const [teachers, setTeachers] = useState([]);
  const [isTeacherSearching, setIsTeacherSearching] = useState<boolean>(false);
  const [isGenCodeDisplay, setIsGenCodeDisplay] = useState(true);
  const [isAdd, setIsAdd] = useState(course === undefined);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [preview, setPreview] =
    useState<{ previewImage: string; previewTitle: string }>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!!course) {
      console.log(course);
      const values = {
        ...course,
        type: course.type.map((item) => item.name),
        teacherId: course.teacherName,
        startTime: moment(course.startTime, '"YYYY/MM/DD"'),
        duration: course.duration,
        durationUnit: course.durationUnit,
      };

      form.setFieldsValue(values);
    }

    if (isAdd) {
      apiService.getCourseCode().then((res) => {
        if (!!res.data) {
          form.setFieldsValue({ uid: res.data, durationUnit: "month" });
          setIsGenCodeDisplay(false);
        }
      });
      apiService.getCourseType().then((res) => {
        setCourseType(res.data);
      });
    }
  }, [course]);

  const onFinish = (values: AddCourseRequest) => {
    const param = {
      ...values,
      durationUnit: Number(DurationUnit[values.durationUnit]),
      startTime: moment(values.startTime)
        .format("YYYY/MM/DD")
        .split("/")
        .join("-"),
      cover: "",
      type: values.type.map((item: string | number) => {
        const type = courseType.find((elem) => {
          return elem.name === item;
        });
        return type.id;
      }),
    };
    apiService.addCourse(param).then((res) => {
      onSuccess(res.data);
    });
  };
  const handlePreview = async (file: UploadFile<any>) => {
    console.log("file", file);
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }

    setPreview({
      previewImage: file.url || file.preview,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
    console.log("preview", preview);
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[8, 16]}>
          <Col span={8}>
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true }, { max: 100, min: 3 }]}
            >
              <Input type="text" placeholder="course name" />
            </Form.Item>
          </Col>

          <Col span={16}>
            <Row gutter={[8, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Teacher"
                  name="teacherId"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Select teacher"
                    notFoundContent={
                      isTeacherSearching ? <Spin size="small" /> : null
                    }
                    filterOption={false}
                    onSearch={(value) => {
                      setIsTeacherSearching(true);
                      apiService.getTeacher({ query: value }).then((res) => {
                        if (!!res.data) {
                          setTeachers(res.data.teachers);
                        }
                        setIsTeacherSearching(false);
                      });
                    }}
                  >
                    {teachers.map(({ id, name }) => (
                      <Select.Option key={id} value={id}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <Select mode="tags">
                    {courseType.map((type) => {
                      return (
                        <Select.Option key={type.id} value={type.name}>
                          {type.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Course Code"
                  name="uid"
                  rules={[{ required: true }]}
                >
                  <Input
                    disabled
                    addonAfter={
                      isGenCodeDisplay ? (
                        <KeyOutlined style={{ cursor: "pointer" }} />
                      ) : null
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[8, 16]}>
          <Col span={8}>
            <Form.Item label="Start Date" name="startTime">
              <DatePicker
                disabledDate={(current) => {
                  const today = getTime(new Date());
                  const date = current.valueOf();
                  return date < today;
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <InputNumber
                min={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                // @ts-ignore
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Student Limit"
              name="maxStudents"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={10} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Duration" rules={[{ required: true }]}>
              <Input.Group compact>
                <Form.Item noStyle name="duration">
                  <InputNumber style={{ width: "70%" }} min={0} />
                </Form.Item>

                <Form.Item noStyle name="durationUnit">
                  <Select
                    style={{ width: "30%" }}
                    className="duration-selection"
                  >
                    <Select.Option value="year">Year</Select.Option>
                    <Select.Option value="month">Month</Select.Option>
                    <Select.Option value="week">Week</Select.Option>
                    <Select.Option value="day">Day</Select.Option>
                    <Select.Option value="hour">Hour</Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Description"
              name="detail"
              className="add-course-description"
              rules={[{ required: true }, { min: 100, max: 1000 }]}
            >
              <Input.TextArea className="input-text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Cover" className="attachment">
              <Form.Item style={{ height: "100%" }}>
                <ImgCrop rotate aspect={16 / 9}>
                  <Upload.Dragger
                    name="files"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    // onChange={({ fileList: newFileList, file }) => {
                    //   const { status } = file;

                    //   if (file?.response) {
                    //     const { url } = file.response;

                    //     form.setFieldsValue({ cover: url });
                    //   } else {
                    //     form.setFieldsValue({ cover: course?.cover || "" });
                    //   }

                    //   setIsUploading(status === "uploading");
                    //   setFileList(newFileList);
                    // }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>

                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </ImgCrop>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isAdd ? "Create Course" : "Update Course"}
            </Button>
          </Form.Item>
        </Row>
      </Form>
      <Modal
        visible={!!preview}
        title={preview?.previewTitle}
        footer={null}
        onCancel={() => setPreview(null)}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={preview?.previewImage}
        />
      </Modal>
    </>
  );
}
