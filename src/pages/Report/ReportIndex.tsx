import React, { useState } from "react";
import type { KeyboardEvent } from "react";
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

import { useQuery } from "@tanstack/react-query";
import { showCaptcha } from "../../service/Authenticate"; // مسیر را با مسیر درست تنظیم کن
import { Icon } from "@iconify/react/dist/iconify.js";

const { Option } = Select;
const { TextArea } = Input;

const steps = [1, 2, 3, 4];

type StepperProps = {
  activeStep: string;
  onStepClick: (step: string) => void;
  validatedTabs: boolean[];
};

const Stepper: React.FC<StepperProps> = ({
  activeStep,
  onStepClick,
  validatedTabs,
}) => {
  return (
    <div className="flex justify-center items-center mb-6 select-none">
      {steps.map((step, idx) => {
        const isActive = activeStep === step.toString();
        const isValidated = validatedTabs[step - 1];
        const isClickable = isValidated || step === 1;

        const buttonClasses = isValidated
          ? "border-green-500 bg-green-500 text-white"
          : isActive
          ? "border-[#00598A] bg-[#00598A] text-white"
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

type SummaryDataType = {
  option: string;
  executive: string;
  subject: string;
  reportType: string;
  urgency: string;
  corruptionValue: number;
  geographicRange: string;
  organizationLevel: string;
  participation: string;
  description: string;
};

function ReportIndex() {
  const [form] = Form.useForm();
  const maxDescriptionLength = 400;
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNext, setLoadingNext] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [validatedTabs, setValidatedTabs] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<SummaryDataType | null>(null);

  const totalSteps = 4;

  const {
    data: captchaData,
    error: captchaError,
    isLoading: captchaLoading,
    refetch: refetchCaptcha,
  } = useQuery({
    queryKey: ["captcha"],
    queryFn: showCaptcha,
  });

  const getFieldsForCurrentTab = (tabKey: string): string[] => {
    switch (tabKey) {
      case "1":
        return ["option", "executive", "subject"];
      case "2":
        return ["reportType", "urgency", "corruptionValue", "geographicRange"];
      case "3":
        return ["organizationLevel", "participation"];
      case "4":
        return ["description", "captcha"];
      default:
        return [];
    }
  };

  const nextTab = async () => {
    setLoadingNext(true);
    try {
      await form.validateFields(getFieldsForCurrentTab(activeTab));
      const currentIndex = parseInt(activeTab, 10) - 1;
      const newValidatedTabs = [...validatedTabs];
      newValidatedTabs[currentIndex] = true;
      setValidatedTabs(newValidatedTabs);

      const next = (parseInt(activeTab, 10) + 1).toString();
      if (parseInt(next, 10) <= totalSteps) {
        setActiveTab(next);
      }
    } catch (error) {
      message.error("لطفا فیلدهای اجباری را کامل کنید.");
    }
    setLoadingNext(false);
  };

  const prevTab = () => {
    const prev = (parseInt(activeTab, 10) - 1).toString();
    if (parseInt(prev, 10) >= 1) {
      setActiveTab(prev);
    }
  };

  const onTabChange = (key: string) => {
    const targetIndex = parseInt(key, 10) - 1;
    if (validatedTabs[targetIndex] || targetIndex === 0) {
      setActiveTab(key);
    } else {
      message.warning("لطفا ابتدا مراحل قبل را تکمیل کنید.");
    }
  };

  const handleFileChange = (info: { fileList: any[] }) => {
    const newFileList = info.fileList;
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj as File;
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);

      // شبیه‌سازی آپلود
      setUploading(true);
      setUploadPercent(0);
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        setUploadPercent(percent);
        if (percent >= 100) {
          clearInterval(interval);
          setUploading(false);
        }
      }, 100);
    } else {
      setFilePreview(null);
      setUploadPercent(0);
      setUploading(false);
    }
  };

  const handleShowSummaryModal = async () => {
    try {
      await form.validateFields();

      const values = form.getFieldsValue(true) as SummaryDataType;
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
      setUploadPercent(0);
      setUploading(false);
    }, 1500);
  };

  const labelStyle = "inline-flex items-center gap-1.5 font-medium";

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    if (changedValues.description !== undefined) {
      setDescriptionLength(changedValues.description.length);
    }
  };

  const onEnterNext = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const target = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      const formElement = target.form;

      if (!formElement) return;

      const formElements = Array.from(
        formElement.querySelectorAll("input, textarea, select, button")
      ).filter(
        (el) =>
          !(el as HTMLInputElement).disabled &&
          (el as HTMLElement).offsetParent !== null
      );

      const index = formElements.indexOf(target);
      if (index > -1 && index < formElements.length - 1) {
        (formElements[index + 1] as HTMLElement).focus();
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto  p-6 rounded-lg">
      <div className=" -mt-6   flex justify-center items-center">
        <img
          src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
          className="size-36"
        />
      </div>
      <br />

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
                    {
                      required: true,
                      message: "موضوع گزارش الزامی است",
                    },
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
                    {
                      required: true,
                      message: "لطفا نوع گزارش را انتخاب کنید",
                    },
                  ]}
                >
                  <Select
                    placeholder="انتخاب نوع گزارش"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="مالی">مالی</Option>
                    <Option value="رفتاری">رفتاری</Option>
                    <Option value="ساختاری">ساختاری</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      درجه فوریت&nbsp;
                      <Tooltip title="درجه فوریت گزارش را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="urgency"
                  rules={[
                    { required: true, message: "درجه فوریت را انتخاب کنید" },
                  ]}
                >
                  <Select
                    placeholder="درجه فوریت"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="عادی">عادی</Option>
                    <Option value="مهم">مهم</Option>
                    <Option value="فوری">فوری</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      ارزش ریالی تخلف&nbsp;
                      <Tooltip title="ارزش ریالی تخلف را وارد کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="corruptionValue"
                  rules={[
                    {
                      required: true,
                      message: "ارزش ریالی تخلف را وارد کنید",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="مثال: 1000000"
                    size="large"
                    onKeyDown={onEnterNext}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      گستره جغرافیایی&nbsp;
                      <Tooltip title="گستره جغرافیایی را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="geographicRange"
                  rules={[
                    {
                      required: true,
                      message: "گستره جغرافیایی را انتخاب کنید",
                    },
                  ]}
                >
                  <Select
                    placeholder="گستره جغرافیایی"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="محلی">محلی</Option>
                    <Option value="منطقه‌ای">منطقه‌ای</Option>
                    <Option value="کشوری">کشوری</Option>
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
                      <Tooltip title="سطح سازمانی مربوطه را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="organizationLevel"
                  rules={[
                    {
                      required: true,
                      message: "لطفا سطح سازمانی را انتخاب کنید",
                    },
                  ]}
                >
                  <Select
                    placeholder="سطح سازمانی"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="سطح ۱">سطح ۱</Option>
                    <Option value="سطح ۲">سطح ۲</Option>
                    <Option value="سطح ۳">سطح ۳</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span className={labelStyle}>
                      مشارکت&nbsp;
                      <Tooltip title="نوع مشارکت را انتخاب کنید">
                        <InfoCircleOutlined className="text-blue-600" />
                      </Tooltip>
                    </span>
                  }
                  name="participation"
                  rules={[
                    {
                      required: true,
                      message: "لطفا نوع مشارکت را انتخاب کنید",
                    },
                  ]}
                >
                  <Select
                    placeholder="نوع مشارکت"
                    size="large"
                    bordered
                    onKeyDown={onEnterNext}
                  >
                    <Option value="دخیل">دخیل</Option>
                    <Option value="غیر دخیل">غیر دخیل</Option>
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
                  توضیحات&nbsp;
                  <Tooltip title="توضیحات تکمیلی گزارش">
                    <InfoCircleOutlined className="text-blue-600" />
                  </Tooltip>
                </span>
              }
              name="description"
              rules={[
                {
                  required: true,
                  message: "لطفا توضیحات را وارد کنید",
                },
                {
                  max: maxDescriptionLength,
                  message: `حداکثر ${maxDescriptionLength} کاراکتر مجاز است`,
                },
              ]}
            >
              <TextArea
                placeholder="توضیحات خود را وارد کنید..."
                rows={4}
                maxLength={maxDescriptionLength}
                onKeyDown={onEnterNext}
              />
            </Form.Item>

            <Form.Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e) => (e && e.fileList) || []}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value.length === 0) {
                      return Promise.resolve();
                    }
                    if (value.length > 1) {
                      return Promise.reject(
                        new Error("تنها یک فایل قابل آپلود است.")
                      );
                    }
                    const allowedTypes = [
                      "application/pdf",
                      "image/jpeg",
                      "image/png",
                    ];
                    const isValidType = value.every((file: any) =>
                      allowedTypes.includes(file.type)
                    );
                    if (!isValidType) {
                      return Promise.reject(
                        new Error("فرمت فایل باید PDF، JPG یا PNG باشد.")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="text-center  flex justify-between    text-gray-500">
                <div>ضمیمه گزارش</div>
                <div>
                  تعداد کاراکترهای توضیحات:
                  <span
                    style={{
                      color:
                        descriptionLength >= maxDescriptionLength
                          ? "red"
                          : "inherit",
                      fontWeight:
                        descriptionLength >= maxDescriptionLength
                          ? "bold"
                          : "normal",
                    }}
                  >
                    {" "}
                    {descriptionLength} / {maxDescriptionLength}
                  </span>
                </div>
              </div>

              <br />
              <Upload.Dragger
                name="file"
                multiple={false}
                accept=".pdf,.jpeg,.jpg,.png"
                fileList={fileList}
                onChange={handleFileChange}
                maxCount={1}
                beforeUpload={() => false}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  فایل را اینجا بکشید یا کلیک کنید
                </p>
                <p className="ant-upload-hint">
                  فقط فایل‌های PDF، JPG و PNG مجاز است.
                </p>
              </Upload.Dragger>
              {/* نوار پیشرفت */}
              {uploading && (
                <div className="w-full my-2">
                  <div className="w-full bg-blue-100 rounded h-3 overflow-hidden">
                    <div
                      className="bg-blue-500 h-3 transition-all"
                      style={{ width: `${uploadPercent}%` }}
                    />
                  </div>
                  <div className="text-xs text-blue-700 text-center mt-1">
                    {uploadPercent}%
                  </div>
                </div>
              )}
            </Form.Item>

            {filePreview && (
              <div className="mb-4 flex justify-center">
                <Image
                  src={filePreview}
                  alt="پیش نمایش فایل"
                  style={{ maxHeight: 100 }}
                />
              </div>
            )}

            <Form.Item
              className=" "
              label="کد امنیتی"
              name="captcha"
              rules={[
                { required: true, message: "لطفا کد امنیتی را وارد کنید!" },
              ]}
            >
              <div className="flex   items-center gap-2">
                <Input
                  placeholder="کد امنیتی را وارد کنید"
                  className=" h-10 rounded-lg border border-gray-300 py-2 px-3 text-center"
                  maxLength={5}
                  autoComplete="off"
                />

                <button
                  type="button"
                  className="h-10 w-10 rounded-lg text-blue-600 hover:text-blue-700 bg-transparent border-none p-0 flex items-center justify-center"
                  onClick={() => refetchCaptcha()}
                >
                  <Icon
                    className="cursor-pointer"
                    icon="mdi:refresh"
                    width="24"
                    height="24"
                  />
                </button>

                <div className="h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-500">
                  {captchaLoading ? (
                    "در حال دریافت کد امنیتی..."
                  ) : captchaError ? (
                    "خطا در دریافت کد امنیتی"
                  ) : captchaData?.captchaImageUrl ? (
                    <img
                      src={captchaData.captchaImageUrl}
                      alt="کد امنیتی"
                      className="h-full !object-fill rounded-lg"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150x40?text=CAPTCHA"
                      alt="کد امنیتی"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>
            </Form.Item>
          </div>
        )}

        <Row justify="space-between" gutter={16}>
          <Col>
            {activeTab !== "1" && (
              <Button size="large" onClick={prevTab}>
                قبلی
              </Button>
            )}
          </Col>

          <Col>
            {activeTab !== totalSteps.toString() && (
              <Button
                className="!bg-[#00598A] duration-300 hover:!duration-300 hover:!bg-[#004c8a]"
                size="large"
                type="primary"
                loading={loadingNext}
                onClick={nextTab}
              >
                بعدی
              </Button>
            )}

            {activeTab === totalSteps.toString() && (
              <Button
                className="!bg-[#00598A] duration-300 hover:!duration-300 hover:!bg-[#004c8a]"
                size="large"
                type="primary"
                loading={loading}
                onClick={handleShowSummaryModal}
              >
                ارسال گزارش
              </Button>
            )}
          </Col>
        </Row>
      </Form>

      <Modal
        title="خلاصه گزارش"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleConfirmSubmit}
        okText="تایید و ارسال"
        cancelText="بازگشت"
        confirmLoading={loading}
      >
        {summaryData && (
          <div className="space-y-3 text-right text-gray-800">
            <p>
              <b>گزینه انتخاب شده:</b> {summaryData.option}
            </p>
            <p>
              <b>دستگاه اجرایی:</b> {summaryData.executive}
            </p>
            <p>
              <b>موضوع گزارش:</b> {summaryData.subject}
            </p>
            <p>
              <b>نوع گزارش:</b> {summaryData.reportType}
            </p>
            <p>
              <b>درجه فوریت:</b> {summaryData.urgency}
            </p>
            <p>
              <b>ارزش ریالی تخلف:</b> {summaryData.corruptionValue}
            </p>
            <p>
              <b>گستره جغرافیایی:</b> {summaryData.geographicRange}
            </p>
            <p>
              <b>سطح سازمانی:</b> {summaryData.organizationLevel}
            </p>
            <p>
              <b>مشارکت:</b> {summaryData.participation}
            </p>
            <p>
              <b>توضیحات:</b> {summaryData.description}
            </p>
            <p>
              <b>فایل ضمیمه:</b>{" "}
              {fileList.length > 0 ? fileList[0].name : "هیچ فایلی انتخاب نشده"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ReportIndex;
