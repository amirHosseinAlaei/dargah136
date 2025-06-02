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
  Modal,
} from "antd";
import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const steps = [1, 2, 3, 4];

const Stepper = ({ activeStep, onStepClick, validatedTabs }) => {
  return (
    <div className="flex justify-center items-center mb-6 select-none">
      {steps.map((step, idx) => {
        const isActive = activeStep === step.toString();
        const isValidated = validatedTabs[step - 1];
        const isClickable = isValidated || step === 1;

        const buttonClasses = isValidated
          ? "border-green-500 bg-green-500 text-white"
          : isActive
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-gray-300 text-gray-400 bg-transparent cursor-default";

        return (
          <React.Fragment key={step}>
            <button
              onClick={() => isClickable && onStepClick(step.toString())}
              disabled={!isClickable}
              className={`w-9 h-9 rounded-full border-2 font-bold transition-colors duration-300 cursor-pointer z-20 flex items-center justify-center ${buttonClasses}`}
              type="button"
            >
              {step}
            </button>

            {idx !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 rounded ${
                  validatedTabs[idx] ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

function ReportIndex() {
  const [form] = Form.useForm();
  const maxDescriptionLength = 400;
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [validatedTabs, setValidatedTabs] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

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

  const handleShowSummaryModal = async () => {
    try {
      // اعتبارسنجی کل فرم (همه فیلدها)
      await form.validateFields();

      // گرفتن همه داده‌های فرم
      const values = form.getFieldsValue(true);
      setSummaryData(values);
      setIsModalVisible(true);
    } catch (error) {
      message.error("لطفا تمامی فیلدهای الزامی را تکمیل کنید.");
    }
  };

  const handleConfirmSubmit = () => {
    setLoading(true);
    setIsModalVisible(false);

    setTimeout(() => {
      setLoading(false);
      message.success("گزارش با موفقیت ارسال شد!");
      form.resetFields();
      setDescriptionLength(0);
      setFileList([]);
      setFilePreview(null);
      setActiveTab("1");
      setValidatedTabs([false, false, false, false]);
      setSummaryData(null);
    }, 1500);
  };

  const labelStyle = "inline-flex items-center gap-1.5 font-medium";

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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center mb-6 text-blue-600 font-bold text-2xl">
        فرم گزارش فساد
      </h2>

      <div className="text-center mb-5 font-semibold text-gray-700">
        مرحله {activeTab} از {totalSteps}
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={() => {}}
        onValuesChange={onValuesChange}
        className="space-y-6"
      >
        <Stepper
          activeStep={activeTab}
          onStepClick={onTabChange}
          validatedTabs={validatedTabs}
        />

        {/* Step Contents */}
        {activeTab === "1" && (
          <div>
            <Form.Item
              label={
                <span className={labelStyle}>
                  انتخاب گزینه&nbsp;
                  <Tooltip title="یک گزینه از لیست انتخاب کنید">
                    <InfoCircleOutlined className="text-blue-600" />
                  </Tooltip>
                </span>
              }
              name="option"
              rules={[
                { required: true, message: "لطفا یک گزینه انتخاب کنید!" },
              ]}
            >
              <Select
                placeholder="لطفا انتخاب کنید"
                size="large"
                bordered
                onKeyDown={onEnterNext}
              >
                <Option value="گزینه ۱">گزینه ۱</Option>
                <Option value="گزینه ۲">گزینه ۲</Option>
                <Option value="گزینه ۳">گزینه ۳</Option>
              </Select>
            </Form.Item>

            <Row gutter={[32, 24]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      دستگاه اجرایی&nbsp;
                      <Tooltip title="نام دستگاه اجرایی را وارد کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="executive"
                  rules={[
                    {
                      required: true,
                      message: "وارد کردن دستگاه اجرایی الزامی است",
                    },
                  ]}
                >
                  <Input
                    placeholder="دستگاه اجرایی"
                    size="large"
                    onKeyDown={onEnterNext}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      موضوع گزارش&nbsp;
                      <Tooltip title="موضوع گزارش را مشخص کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="subject"
                  rules={[
                    { required: true, message: "موضوع گزارش الزامی است" },
                  ]}
                >
                  <Input
                    placeholder="موضوع گزارش"
                    size="large"
                    onKeyDown={onEnterNext}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}

        {activeTab === "2" && (
          <div>
            <Row gutter={[32, 24]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      نوع گزارش&nbsp;
                      <Tooltip title="نوع گزارش را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="reportType"
                  rules={[
                    { required: true, message: "نوع گزارش را انتخاب کنید" },
                  ]}
                >
                  <Select
                    placeholder="انتخاب نوع گزارش"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="اداری">اداری</Option>
                    <Option value="مالی">مالی</Option>
                    <Option value="سایر">سایر</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      فوریت&nbsp;
                      <Tooltip title="فوریت گزارش را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="urgency"
                  rules={[{ required: true, message: "فوریت را انتخاب کنید" }]}
                >
                  <Select
                    placeholder="انتخاب فوریت"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="عادی">عادی</Option>
                    <Option value="فوری">فوری</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      میزان فساد&nbsp;
                      <Tooltip title="میزان فساد را مشخص کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="corruptionValue"
                  rules={[
                    { required: true, message: "میزان فساد را مشخص کنید" },
                  ]}
                >
                  <Select
                    placeholder="انتخاب میزان فساد"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="کم">کم</Option>
                    <Option value="متوسط">متوسط</Option>
                    <Option value="زیاد">زیاد</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      دامنه جغرافیایی&nbsp;
                      <Tooltip title="دامنه جغرافیایی را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="geographicRange"
                  rules={[
                    {
                      required: true,
                      message: "دامنه جغرافیایی را انتخاب کنید",
                    },
                  ]}
                >
                  <Select
                    placeholder="انتخاب دامنه جغرافیایی"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="محلی">محلی</Option>
                    <Option value="ملی">ملی</Option>
                    <Option value="بین‌المللی">بین‌المللی</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}

        {activeTab === "3" && (
          <div>
            <Row gutter={[32, 24]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      سطح سازمانی&nbsp;
                      <Tooltip title="سطح سازمانی را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="organizationLevel"
                  rules={[
                    { required: true, message: "سطح سازمانی را انتخاب کنید" },
                  ]}
                >
                  <Select
                    placeholder="انتخاب سطح سازمانی"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="سازمانی">سازمانی</Option>
                    <Option value="مدیریتی">مدیریتی</Option>
                    <Option value="عملیاتی">عملیاتی</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      نحوه مشارکت&nbsp;
                      <Tooltip title="نحوه مشارکت را مشخص کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="participation"
                  rules={[
                    { required: true, message: "نحوه مشارکت را مشخص کنید" },
                  ]}
                >
                  <Select
                    placeholder="انتخاب نحوه مشارکت"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="حضوری">حضوری</Option>
                    <Option value="غیرحضوری">غیرحضوری</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}

        {activeTab === "4" && (
          <div>
            <Form.Item
              label={
                <span className={labelStyle}>
                  توضیحات تکمیلی&nbsp;
                  <Tooltip title="توضیحات بیشتر خود را وارد کنید">
                    <InfoCircleOutlined className="text-blue-600" />
                  </Tooltip>
                </span>
              }
              name="description"
              rules={[
                { required: true, message: "وارد کردن توضیحات الزامی است" },
              ]}
            >
              <TextArea
                rows={5}
                maxLength={maxDescriptionLength}
                placeholder="توضیحات خود را وارد کنید"
                onKeyDown={onEnterNext}
                showCount
              />
            </Form.Item>

            <Form.Item label="فایل پیوست">
              <Upload.Dragger
                multiple={false}
                beforeUpload={() => false} // جلوگیری از آپلود خودکار
                fileList={fileList}
                onChange={handleFileChange}
                maxCount={1}
                accept=".jpg,.png,.pdf,.doc,.docx"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  فایل را اینجا رها کنید یا کلیک کنید
                </p>
                <p className="ant-upload-hint">
                  فایل‌های jpg, png, pdf, doc قابل قبول هستند
                </p>
              </Upload.Dragger>
              {filePreview && (
                <div className="mt-3">
                  <Image src={filePreview} alt="پیش نمایش فایل" />
                </div>
              )}
            </Form.Item>
          </div>
        )}

        {/* دکمه‌های ناوبری */}
        <div className="flex justify-between">
          {activeTab !== "1" && (
            <Button size="large" onClick={prevTab}>
              بازگشت
            </Button>
          )}

          {activeTab !== totalSteps.toString() && (
            <Button type="primary" size="large" onClick={nextTab}>
              مرحله بعد
            </Button>
          )}

          {activeTab === totalSteps.toString() && (
            <Button
              type="primary"
              size="large"
              onClick={handleShowSummaryModal}
              loading={loading}
            >
              ثبت نهایی و مشاهده خلاصه
            </Button>
          )}
        </div>
      </Form>

      {/* مدال خلاصه گزارش */}
      <Modal
        title="خلاصه گزارش"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleConfirmSubmit}
        okText="تایید و ارسال"
        cancelText="بازگشت"
        confirmLoading={loading}
        centered
      >
        {summaryData ? (
          <>
            <p>
              <strong>گزینه انتخاب شده:</strong> {summaryData.option || "-"}
            </p>
            <p>
              <strong>دستگاه اجرایی:</strong> {summaryData.executive || "-"}
            </p>
            <p>
              <strong>موضوع گزارش:</strong> {summaryData.subject || "-"}
            </p>
            <p>
              <strong>نوع گزارش:</strong> {summaryData.reportType || "-"}
            </p>
            <p>
              <strong>فوریت:</strong> {summaryData.urgency || "-"}
            </p>
            <p>
              <strong>میزان فساد:</strong> {summaryData.corruptionValue || "-"}
            </p>
            <p>
              <strong>دامنه جغرافیایی:</strong>{" "}
              {summaryData.geographicRange || "-"}
            </p>
            <p>
              <strong>سطح سازمانی:</strong>{" "}
              {summaryData.organizationLevel || "-"}
            </p>
            <p>
              <strong>نحوه مشارکت:</strong> {summaryData.participation || "-"}
            </p>
            <p>
              <strong>توضیحات تکمیلی:</strong> {summaryData.description || "-"}
            </p>

            {filePreview ? (
              <div className="mt-3">
                <strong>پیش نمایش فایل پیوست:</strong>
                <Image src={filePreview} alt="پیش نمایش فایل" />
              </div>
            ) : fileList.length > 0 ? (
              <div className="mt-3">
                <strong>فایل پیوست:</strong> {fileList[0].name}
              </div>
            ) : null}
          </>
        ) : (
          <p>در حال بارگذاری...</p>
        )}
      </Modal>
    </div>
  );
}

export default ReportIndex;
