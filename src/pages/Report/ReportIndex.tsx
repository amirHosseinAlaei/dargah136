import React, { useState } from "react";
import {
  Form,
  Select,
  Input,
  Upload,
  Button,
  Image,
  Row,
  Col,
  Tooltip,
  Progress,
  message,
} from "antd";
import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

function ReportIndex() {
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const maxDescriptionLength = 400;

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    } else {
      setFilePreview(null);
    }
  };

  const onFinish = (values) => {
    setLoading(true);
    // Simulate submitting data
    setTimeout(() => {
      setLoading(false);
      message.success("گزارش با موفقیت ارسال شد!");
      // Reset form and states
      form.resetFields();
      setDescription("");
      setFileList([]);
      setFilePreview(null);
    }, 1500);
  };

  const onFinishFailed = () => {
    message.error("لطفا تمامی فیلدهای الزامی را تکمیل کنید.");
  };

  const [form] = Form.useForm();

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 24,
        background: "#fefefe",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 24,
          color: "#1890ff",
          fontWeight: "bold",
          fontSize: 26,
        }}
      >
        فرم گزارش فساد
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          label={
            <span>
              انتخاب گزینه&nbsp;
              <Tooltip title="یک گزینه از لیست انتخاب کنید">
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          name="option"
          rules={[{ required: true, message: "لطفا یک گزینه انتخاب کنید!" }]}
        >
          <Select placeholder="لطفا انتخاب کنید" size="large" bordered>
            {[...Array(8)].map((_, i) => (
              <Option key={i + 1} value={i + 1}>
                {`گزینه ${i + 1}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  دستگاه اجرایی&nbsp;
                  <Tooltip title="نام دستگاه اجرایی را وارد کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="executive"
              rules={[
                { required: true, message: "وارد کردن دستگاه اجرایی الزامی است" },
              ]}
            >
              <Input placeholder="دستگاه اجرایی را وارد کنید" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  موضوع تخصصی&nbsp;
                  <Tooltip title="موضوع تخصصی گزارش را وارد کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="subject"
              rules={[
                { required: true, message: "وارد کردن موضوع تخصصی الزامی است" },
              ]}
            >
              <Input placeholder="موضوع تخصصی را وارد کنید" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  نوع گزارش&nbsp;
                  <Tooltip title="نوع گزارش را مشخص کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="reportType"
              rules={[
                { required: true, message: "وارد کردن نوع گزارش الزامی است" },
              ]}
            >
              <Input placeholder="نوع گزارش را وارد کنید" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  فوریت‌های رسیدگی&nbsp;
                  <Tooltip title="سطح فوریت رسیدگی را وارد کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="urgency"
              rules={[
                { required: true, message: "وارد کردن فوریت الزامی است" },
              ]}
            >
              <Input placeholder="فوریت‌های رسیدگی را وارد کنید" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  برآورد ارزش فساد&nbsp;
                  <Tooltip title="میزان برآورد شده ارزش فساد را وارد کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="corruptionValue"
              rules={[
                { required: true, message: "وارد کردن برآورد ارزش الزامی است" },
              ]}
            >
              <Input placeholder="برآورد ارزش فساد را وارد کنید" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  محدوده جغرافیایی تاثیر فساد&nbsp;
                  <Tooltip title="محدوده جغرافیایی تحت تاثیر را وارد کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="geographicRange"
              rules={[
                { required: true, message: "وارد کردن محدوده جغرافیایی الزامی است" },
              ]}
            >
              <Input placeholder="محدوده جغرافیایی را وارد کنید" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[24, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  سطح سازمانی&nbsp;
                  <Tooltip title="سطح سازمانی مرتبط را وارد کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="organizationLevel"
              rules={[
                { required: true, message: "وارد کردن سطح سازمانی الزامی است" },
              ]}
            >
              <Input placeholder="سطح سازمانی را وارد کنید" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <span>
                  مشارکت در فساد&nbsp;
                  <Tooltip title="نوع مشارکت در فساد را وارد کنید">
                    <InfoCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="participation"
              rules={[
                { required: true, message: "وارد کردن مشارکت الزامی است" },
              ]}
            >
              <Input placeholder="مشارکت در فساد را وارد کنید" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={
            <span>
              شرح (حداکثر {maxDescriptionLength} کاراکتر)&nbsp;
              <Tooltip title="شرح کامل گزارش را وارد کنید">
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          name="description"
          rules={[{ required: true, message: "شرح الزامی است" }]}
        >
          <TextArea
            maxLength={maxDescriptionLength}
            rows={5}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="توضیحات خود را وارد کنید..."
            size="large"
          />
          <Progress
            percent={(description.length / maxDescriptionLength) * 100}
            size="small"
            status={description.length >= maxDescriptionLength ? "exception" : "normal"}
            strokeWidth={6}
            showInfo={false}
            style={{ marginTop: 8 }}
          />
          <div
            style={{
              textAlign: "right",
              fontSize: 12,
              color: description.length >= maxDescriptionLength ? "red" : "#999",
              marginTop: 4,
            }}
          >
            {description.length} / {maxDescriptionLength}
          </div>
        </Form.Item>

        <Form.Item label="ضمیمه سند (عکس)">
          <Dragger
            accept="image/*"
            maxCount={1}
            onChange={handleFileChange}
            fileList={fileList}
            beforeUpload={() => false}
            style={{
              width: "100%",
              padding: "20px 0",
              borderRadius: 8,
              border: "2px dashed #1890ff",
              background: "#fafafa",
              transition: "border-color 0.3s",
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: 48, color: "#1890ff" }} />
            </p>
            <p className="ant-upload-text">فایل خود را اینجا بکشید یا کلیک کنید</p>
            <p className="ant-upload-hint">تنها تصاویر با فرمت مجاز قابل آپلود هستند</p>
          </Dragger>
          {filePreview && (
            <Image
              src={filePreview}
              alt="Preview"
              style={{
                marginTop: 12,
                maxHeight: 220,
                borderRadius: 8,
                border: "1px solid #d9d9d9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              preview={{ mask: <div>پیش‌نمایش</div> }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Row justify="space-between" gutter={16}>
            <Col>
              <Button
                type="default"
                size="large"
                onClick={() => {
                  form.resetFields();
                  setDescription("");
                  setFileList([]);
                  setFilePreview(null);
                }}
              >
                پاک کردن فرم
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                ارسال گزارش
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ReportIndex;
