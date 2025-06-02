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
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { showCaptcha } from "../../service/Authenticate"; // فرض بر این که تابع واکشی کپچا همینجا هست

const { Option } = Select;
const { TextArea } = Input;

const steps = [1, 2, 3, 4];

// (کد Stepper و بقیه کدها بدون تغییر)

function ReportIndex() {
  const [form] = Form.useForm();
  const maxDescriptionLength = 400;
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [validatedTabs, setValidatedTabs] = useState([false, false, false, false]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const totalSteps = 4;

  // واکشی کپچا با react-query
  const { data: captchaData, error: captchaError, isLoading: captchaLoading, refetch: refetchCaptcha } = useQuery({
    queryKey: ["captcha"],
    queryFn: showCaptcha,
    refetchOnWindowFocus: false,
  });

  // افزودن فیلد کپچا به اعتبارسنجی نهایی فرم
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
      case "5": // کپچا
        return ["captchaInput"];
      default:
        return [];
    }
  };

  // برای کپچا، ما مرحله جدیدی ایجاد نمی‌کنیم، فقط اعتبارسنجی در انتهای ارسال اضافه می‌کنیم

  // مدیریت تغییرات کپچا
  const onValuesChange = (changedValues) => {
    if (changedValues.description !== undefined) {
      setDescriptionLength(changedValues.description.length);
    }
  };

  // هنگام نمایش خلاصه و ارسال نهایی، اعتبارسنجی کپچا را هم اضافه می‌کنیم
  const handleShowSummaryModal = async () => {
    try {
      // اعتبارسنجی همه فیلدهای فرم به همراه کپچا
      await form.validateFields();

      // گرفتن مقدار کپچا وارد شده و مقایسه با مقدار واقعی کپچا (فرضاً داده از API)
      const values = form.getFieldsValue(true);

      if (!captchaData?.captchaText) {
        message.error("کد امنیتی معتبر دریافت نشده است. لطفا مجددا تلاش کنید.");
        return;
      }

      if (values.captchaInput?.trim().toLowerCase() !== captchaData.captchaText.toLowerCase()) {
        message.error("کد امنیتی وارد شده اشتباه است.");
        return;
      }

      setSummaryData(values);
      setIsModalVisible(true);
    } catch (error) {
      message.error("لطفا تمامی فیلدهای الزامی را تکمیل کنید.");
    }
  };

  // ادامه کدها بدون تغییر...

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg bg-white">
      <h2 className="text-center mb-6 text-black font-black text-2xl">
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
          onStepClick={(key) => {
            const targetIndex = parseInt(key, 10) - 1;
            if (validatedTabs[targetIndex] || targetIndex === 0) {
              setActiveTab(key);
            } else {
              message.warning("لطفا ابتدا مراحل قبل را تکمیل کنید.");
            }
          }}
          validatedTabs={validatedTabs}
        />

        {/* محتوای مراحل قبلی بدون تغییر */}

        {/* مرحله 4: توضیحات + آپلود فایل */}
        {activeTab === "4" && (
          <>
            <Form.Item
              label={
                <span className="inline-flex items-center gap-1.5 font-medium">
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
                showCount
              />
            </Form.Item>

            <Form.Item label="فایل پیوست">
              <Upload.Dragger
                multiple={false}
                beforeUpload={() => false}
                fileList={fileList}
                onChange={({ fileList }) => {
                  setFileList(fileList);
                  if (fileList.length > 0) {
                    const file = fileList[0].originFileObj;
                    setFilePreview(URL.createObjectURL(file));
                  } else {
                    setFilePreview(null);
                  }
                }}
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

            {/* کپچا */}
            <Form.Item
              label="کد امنیتی"
              name="captchaInput"
              rules={[{ required: true, message: "لطفا کد امنیتی را وارد کنید!" }]}
            >
              <div className="flex items-center gap-2">
                <Input
                  placeholder="کد امنیتی را وارد کنید"
                  className="!w-32 h-10 rounded-lg border border-gray-300 py-2 px-3 text-center"
                  maxLength={5}
                />

                <button
                  type="button"
                  className="h-10 rounded-lg text-blue-600 hover:text-blue-700 bg-transparent border-none p-0 flex items-center justify-center"
                  onClick={() => refetchCaptcha()}
                >
                  <Icon icon="mdi:refresh" className="text-2xl" />
                </button>

                <div className="w-48 h-10 relative rounded-lg border border-gray-300 overflow-hidden">
                  {captchaLoading ? (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center text-sm text-gray-600 font-semibold">
                      در حال دریافت کد امنیتی...
                    </div>
                  ) : captchaError ? (
                    <div className="absolute inset-0 bg-red-100 flex items-center justify-center text-sm text-red-600 font-semibold">
                      خطا در دریافت کد امنیتی
                    </div>
                  ) : (
                    <img
                      src={captchaData?.captchaImageUrl || "https://via.placeholder.com/150x40?text=CAPTCHA"}
                      alt="کد امنیتی"
                      className="w-full h-full object-fill rounded-lg"
                    />
                  )}
                </div>
              </div>
            </Form.Item>
          </>
        )}

        {/* دکمه‌های ناوبری */}
        <div className="flex justify-between">
          {activeTab !== "1" && (
            <Button size="large" onClick={() => {
              const prev = (parseInt(activeTab) - 1).toString();
              setActiveTab(prev);
            }}>
              بازگشت
            </Button>
          )}

          {activeTab !== totalSteps.toString() && (
            <Button
              className="!bg-sky-800 hover:!bg-sky-900"
              type="primary"
              size="large"
              onClick={async () => {
                try {
                  const currentFields = getFieldsForCurrentTab(activeTab);
                  await form.validateFields(currentFields);

                  const newValidated = [...validatedTabs];
                  newValidated[parseInt(activeTab) - 1] = true;
                  setValidatedTabs(newValidated);

                  const nextStep = (parseInt(activeTab) + 1).toString();
                  setActiveTab(nextStep);
                } catch (error) {
                  message.error("لطفا فیلدهای الزامی را تکمیل کنید.");
                }
              }}
            >
              ادامه
            </Button>
          )}

          {activeTab === totalSteps.toString() && (
            <Button
              className="!bg-sky-800 hover:!bg-sky-900"
              type="primary"
              size="large"
              onClick={handleShowSummaryModal}
              loading={loading}
            >
              ارسال گزارش
            </Button>
          )}
        </div>
      </Form>

      <Modal
        title="خلاصه گزارش"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          form.resetFields();
          setDescriptionLength(0);
          setFileList([]);
          setFilePreview(null);
          setActiveTab("1");
          setValidatedTabs([false, false, false, false]);
          setSummaryData(null);
          message.success("گزارش با موفقیت ارسال شد!");
        }}
        onCancel={() => setIsModalVisible(false)}
        okText="تایید"
        cancelText="لغو"
      >
        <pre>{JSON.stringify(summaryData, null, 2)}</pre>
      </Modal>
    </div>
  );
}

export default ReportIndex;
