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
  message,
  Tabs,
} from "antd";
import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;
const { TabPane } = Tabs;

function ReportIndex() {
  const [form] = Form.useForm();
  const maxDescriptionLength = 400;
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [validatedTabs, setValidatedTabs] = useState([false, false, false, false]);
  const totalSteps = 4;

  const getFieldsForCurrentTab = (tabKey) => {
    switch (tabKey) {
      case "1":
        return ["option", "executive", "subject"];
      case "2":
        return ["reportType", "urgency", "corruptionValue", "geographicRange"];
      case "3":
        return ["organizationLevel", "participation"];
      case "4":
        return ["description"];
      default:
        return [];
    }
  };

  const nextTab = async () => {
    try {
      await form.validateFields(getFieldsForCurrentTab(activeTab));
      const currentIndex = parseInt(activeTab, 10) - 1;
      const newValidatedTabs = [...validatedTabs];
      newValidatedTabs[currentIndex] = true;
      setValidatedTabs(newValidatedTabs);

      const next = (parseInt(activeTab) + 1).toString();
      if (next <= totalSteps) {
        setActiveTab(next);
      }
    } catch (error) {
      message.error("لطفا فیلدهای اجباری را کامل کنید.");
    }
  };

  const prevTab = () => {
    const prev = (parseInt(activeTab) - 1).toString();
    if (prev >= 1) {
      setActiveTab(prev);
    }
  };

  const onTabChange = (key) => {
    const targetIndex = parseInt(key, 10) - 1;
    if (validatedTabs[targetIndex] || targetIndex === 0) {
      setActiveTab(key);
    } else {
      message.warning("لطفا ابتدا مراحل قبل را تکمیل کنید.");
    }
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
    setTimeout(() => {
      setLoading(false);
      message.success("گزارش با موفقیت ارسال شد!");
      form.resetFields();
      setDescriptionLength(0);
      setFileList([]);
      setFilePreview(null);
      setActiveTab("1");
      setValidatedTabs([false, false, false, false]);
    }, 1500);
  };

  const onFinishFailed = () => {
    message.error("لطفا تمامی فیلدهای الزامی را تکمیل کنید.");
  };

  const labelStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontWeight: "500",
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.description !== undefined) {
      setDescriptionLength(changedValues.description.length);
    }
  };

  const onEnterNext = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const formElements = Array.from(
        e.target.form.querySelectorAll("input, textarea, select, button")
      ).filter((el) => !el.disabled && el.offsetParent !== null);

      const index = formElements.indexOf(e.target);
      if (index > -1 && index < formElements.length - 1) {
        formElements[index + 1].focus();
      }
    }
  };

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

      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          fontWeight: "600",
          fontSize: 16,
          color: "#555",
        }}
      >
        مرحله {activeTab} از {totalSteps}
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
        onValuesChange={onValuesChange}
      >
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          type="card"
          centered
          tabBarStyle={{ marginBottom: 24 }} // فاصله بین تب‌ها و محتوا
        >
          <TabPane tab="اطلاعات اصلی" key="1" disabled={false}>
            <div style={{ padding: "24px 12px 36px 12px" }}>
              <Form.Item
                label={
                  <span style={labelStyle}>
                    انتخاب گزینه&nbsp;
                    <Tooltip title="یک گزینه از لیست انتخاب کنید">
                      <InfoCircleOutlined style={{ color: "#1890ff" }} />
                    </Tooltip>
                  </span>
                }
                name="option"
                rules={[{ required: true, message: "لطفا یک گزینه انتخاب کنید!" }]}
              >
                <Select
                  placeholder="لطفا انتخاب کنید"
                  size="large"
                  bordered
                  onKeyDown={onEnterNext}
                >
                  {[...Array(8)].map((_, i) => (
                    <Option key={i + 1} value={i + 1}>
                      {`گزینه ${i + 1}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row gutter={[32, 24]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        دستگاه اجرایی&nbsp;
                        <Tooltip title="نام دستگاه اجرایی را وارد کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="executive"
                    rules={[{ required: true, message: "وارد کردن دستگاه اجرایی الزامی است" }]}
                  >
                    <Input
                      placeholder="دستگاه اجرایی را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        موضوع تخصصی&nbsp;
                        <Tooltip title="موضوع تخصصی گزارش را وارد کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="subject"
                    rules={[{ required: true, message: "وارد کردن موضوع تخصصی الزامی است" }]}
                  >
                    <Input
                      placeholder="موضوع تخصصی را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ marginTop: 16, textAlign: "right" }}>
                <Button type="primary" onClick={nextTab}>
                  مرحله بعد
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="جزئیات گزارش" key="2" disabled={!validatedTabs[0]}>
            <div style={{ padding: "24px 12px 36px 12px" }}>
              <Row gutter={[32, 24]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        نوع گزارش&nbsp;
                        <Tooltip title="نوع گزارش را مشخص کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="reportType"
                    rules={[{ required: true, message: "وارد کردن نوع گزارش الزامی است" }]}
                  >
                    <Input
                      placeholder="نوع گزارش را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        فوریت‌های رسیدگی&nbsp;
                        <Tooltip title="سطح فوریت رسیدگی را وارد کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="urgency"
                    rules={[{ required: true, message: "وارد کردن فوریت الزامی است" }]}
                  >
                    <Input
                      placeholder="فوریت‌های رسیدگی را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[32, 24]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        برآورد ارزش فساد&nbsp;
                        <Tooltip title="میزان برآورد شده ارزش فساد را وارد کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="corruptionValue"
                    rules={[{ required: true, message: "وارد کردن برآورد ارزش الزامی است" }]}
                  >
                    <Input
                      placeholder="برآورد ارزش فساد را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        محدوده جغرافیایی تاثیر فساد&nbsp;
                        <Tooltip title="محدوده جغرافیایی تحت تاثیر را وارد کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="geographicRange"
                    rules={[{ required: true, message: "وارد کردن محدوده جغرافیایی الزامی است" }]}
                  >
                    <Input
                      placeholder="محدوده جغرافیایی را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ marginTop: 16, textAlign: "right" }}>
                <Button type="default" onClick={prevTab} style={{ marginRight: 24 }}>
                  مرحله قبل
                </Button>
                <Button type="primary" onClick={nextTab}>
                  مرحله بعد
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="اطلاعات سازمانی" key="3" disabled={!validatedTabs[1]}>
            <div style={{ padding: "24px 12px 36px 12px" }}>
              <Row gutter={[32, 24]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        سطح سازمانی&nbsp;
                        <Tooltip title="سطح سازمانی مرتبط را وارد کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="organizationLevel"
                    rules={[{ required: true, message: "وارد کردن سطح سازمانی الزامی است" }]}
                  >
                    <Input
                      placeholder="سطح سازمانی را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={
                      <span style={labelStyle}>
                        مشارکت در فساد&nbsp;
                        <Tooltip title="نوع مشارکت در فساد را وارد کنید">
                          <InfoCircleOutlined style={{ color: "#1890ff" }} />
                        </Tooltip>
                      </span>
                    }
                    name="participation"
                    rules={[{ required: true, message: "وارد کردن نوع مشارکت الزامی است" }]}
                  >
                    <Input
                      placeholder="نوع مشارکت را وارد کنید"
                      size="large"
                      onKeyDown={onEnterNext}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ marginTop: 16, textAlign: "right" }}>
                <Button type="default" onClick={prevTab} style={{ marginRight: 24 }}>
                  مرحله قبل
                </Button>
                <Button type="primary" onClick={nextTab}>
                  مرحله بعد
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="توضیحات تکمیلی" key="4" disabled={!validatedTabs[2]}>
            <div style={{ padding: "24px 12px 36px 12px" }}>
              <Form.Item
                label={
                  <span style={labelStyle}>
                    توضیحات&nbsp;
                    <Tooltip title={`حداکثر ${maxDescriptionLength} کاراکتر`}>
                      <InfoCircleOutlined style={{ color: "#1890ff" }} />
                    </Tooltip>
                  </span>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: "توضیحات را وارد کنید",
                  },
                  {
                    max: maxDescriptionLength,
                    message: `حداکثر ${maxDescriptionLength} کاراکتر مجاز است`,
                  },
                ]}
              >
                <TextArea
                  rows={5}
                  maxLength={maxDescriptionLength}
                  placeholder="توضیحات را وارد کنید"
                  showCount
                  onKeyDown={onEnterNext}
                />
              </Form.Item>

              <Form.Item
                label="ضمیمه فایل (اختیاری)"
                name="attachment"
              >
                <Dragger
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                  style={{ padding: 12, borderRadius: 8 }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">فایل خود را اینجا رها کنید یا کلیک کنید</p>
                  <p className="ant-upload-hint">فقط یک فایل مجاز است</p>
                </Dragger>

                {filePreview && (
                  <div style={{ marginTop: 16, textAlign: "center" }}>
                    <Image
                      src={filePreview}
                      alt="پیش‌نمایش فایل"
                      style={{ maxHeight: 150, objectFit: "contain" }}
                      preview={{ mask: <div>پیش‌نمایش فایل</div> }}
                    />
                  </div>
                )}
              </Form.Item>

              <div style={{ marginTop: 16, textAlign: "right" }}>
                <Button type="default" onClick={prevTab} style={{ marginRight: 24 }}>
                  مرحله قبل
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  ارسال گزارش
                </Button>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
}

export default ReportIndex;
