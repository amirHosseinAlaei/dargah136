import React, { useState, useRef } from "react";
import { Form, Input, Button, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { showCaptcha } from "../../service/Authenticate";

const { TextArea } = Input;

const ReportIndex = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [form] = Form.useForm();

  // گرفتن کپچا با react-query
  const {
    data: captchaData,
    error: captchaError,
    isLoading: captchaLoading,
    refetch: refetchCaptcha,
  } = useQuery({
    queryKey: ["captcha_report"],
    queryFn: showCaptcha,
    refetchOnWindowFocus: false,
  });

  // رفتن به تب بعدی با اعتبارسنجی
  const nextTab = async () => {
    try {
      // اعتبارسنجی فقط فیلدهای مربوط به تب فعال
      let fieldsToValidate = [];

      if (activeTab === "1") fieldsToValidate = ["field1", "field2"]; // مثال
      else if (activeTab === "2") fieldsToValidate = ["field3"];
      else if (activeTab === "3") fieldsToValidate = ["field4"];
      else if (activeTab === "4") fieldsToValidate = ["description", "captcha"]; // اضافه شدن captcha

      await form.validateFields(fieldsToValidate);
      setActiveTab((prev) => (parseInt(prev) + 1).toString());
    } catch (errorInfo) {
      message.error("لطفا فیلدهای مورد نیاز را به درستی پر کنید.");
    }
  };

  // ارسال فرم نهایی
  const onFinish = async (values) => {
    // اینجا می‌تونی مقدار captcha و بقیه فیلدها رو ارسال به سرور بدی
    console.log("اطلاعات ارسال شد:", values);

    // مثال اعتبارسنجی کپچا سمت سرور
    try {
      // فرضا validateCaptcha یک فانکشن است که کپچا را چک می‌کند
      // await validateCaptcha(values.captcha);

      message.success("گزارش با موفقیت ارسال شد.");
      form.resetFields();
      setActiveTab("1");
      refetchCaptcha();
    } catch (err) {
      message.error("کد امنیتی اشتباه است، لطفا دوباره تلاش کنید.");
      refetchCaptcha();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">ثبت گزارش</h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        {activeTab === "1" && (
          <>
            <Form.Item
              label="فیلد ۱"
              name="field1"
              rules={[{ required: true, message: "این فیلد الزامی است" }]}
            >
              <Input placeholder="فیلد ۱" />
            </Form.Item>
            <Form.Item
              label="فیلد ۲"
              name="field2"
              rules={[{ required: true, message: "این فیلد الزامی است" }]}
            >
              <Input placeholder="فیلد ۲" />
            </Form.Item>
          </>
        )}

        {activeTab === "2" && (
          <Form.Item
            label="فیلد ۳"
            name="field3"
            rules={[{ required: true, message: "این فیلد الزامی است" }]}
          >
            <Input placeholder="فیلد ۳" />
          </Form.Item>
        )}

        {activeTab === "3" && (
          <Form.Item
            label="فیلد ۴"
            name="field4"
            rules={[{ required: true, message: "این فیلد الزامی است" }]}
          >
            <Input placeholder="فیلد ۴" />
          </Form.Item>
        )}

        {activeTab === "4" && (
          <>
            <Form.Item
              label="توضیحات"
              name="description"
              rules={[{ required: true, message: "لطفا توضیحات را وارد کنید" }]}
            >
              <TextArea rows={4} placeholder="توضیحات..." />
            </Form.Item>

            {/* کپچا */}
            <Form.Item
              label="کد امنیتی"
              name="captcha"
              rules={[{ required: true, message: "لطفا کد امنیتی را وارد کنید!" }]}
            >
              <div className="flex items-center gap-2">
                <Input
                  placeholder="کد امنیتی"
                  maxLength={5}
                  autoComplete="off"
                  className="!w-32 h-10 rounded-lg border border-gray-300 py-2 px-3 text-center"
                />

                <button
                  type="button"
                  className="h-10 rounded-lg text-blue-600 hover:text-blue-700 bg-transparent border-none p-0 flex items-center justify-center"
                  onClick={() => refetchCaptcha()}
                >
                  <InfoCircleOutlined style={{ fontSize: 24 }} />
                </button>

                <div className="flex-1 h-10 relative rounded-lg border border-gray-300 overflow-hidden">
                  {captchaLoading ? (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center text-sm text-gray-600 font-semibold">
                      در حال دریافت کد امنیتی...
                    </div>
                  ) : captchaError ? (
                    <div className="text-red-600 text-sm text-center">
                      خطا در دریافت کد امنیتی
                    </div>
                  ) : (
                    <img
                      src={captchaData?.captchaImageUrl || "https://via.placeholder.com/100x40?text=CAPTCHA"}
                      alt="کد امنیتی"
                      className="w-full h-full object-fill rounded-lg"
                    />
                  )}
                </div>
              </div>
            </Form.Item>
          </>
        )}

        <div className="flex justify-between mt-6">
          {activeTab !== "1" && (
            <Button
              onClick={() => setActiveTab((prev) => (parseInt(prev) - 1).toString())}
            >
              قبلی
            </Button>
          )}

          {activeTab !== "4" && (
            <Button type="primary" onClick={nextTab}>
              بعدی
            </Button>
          )}

          {activeTab === "4" && (
            <Button type="primary" htmlType="submit">
              ارسال نهایی
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ReportIndex;
