import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import fa_IR from "antd/es/date-picker/locale/fa_IR";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { showCaptcha } from "../../service/Authenticate"; // فرض بر اینکه مثل forget این سرویس داری

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["captcha_register"],
    queryFn: showCaptcha,
  });

  const MAX_MOBILE = 11;
  const MAX_NATIONAL = 10;
  const MAX_PERSIAN = 30;

  const handleNumericInput = (e, maxLen, setter, fieldName) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > maxLen) val = val.slice(0, maxLen);
    form.setFieldsValue({ [fieldName]: val });
    setter(val.length);
  };

  const handlePersianInput = (e, maxLen, fieldName) => {
    let val = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
    if (val.length > maxLen) val = val.slice(0, maxLen);
    form.setFieldsValue({ [fieldName]: val });
  };

  const onFinish = (values) => {
    if (values.birthDate) values.birthDate = values.birthDate.format("YYYY/MM/DD");
    console.log("اطلاعات ثبت‌نام:", values);
    alert("ثبت نام با موفقیت انجام شد!");
  };

  return (
    <div className="flex bg-white p-4 rounded-lg shadow-lg md:shadow-none md:bg-transparent justify-center items-center">
      <div className="md:bg-white w-full px-5 rounded-lg sm:p-6 md:p-10 space-y-4 max-w-lg mx-auto">
        <div className="text-center space-y-3">
          <img
            src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
            alt="Logo"
            className="!w-36 sm:w-20 mx-auto"
          />
          <div className="space-y-1">
            <p className="font-bold text-gray-800 text-base sm:text-lg">
              درگاه یکپارچه سازمان بازرسی کل کشور
            </p>
            <a
              className="font-black text-blue-600 hover:text-blue-800 text-sm"
              href="https://136.bazresi.ir/dargah/dashboard2/guest"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.136.ir
            </a>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-sm">
            خطا در دریافت کد امنیتی
          </div>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4 !w-full"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* فیلدهای ثبت‌نام */}
            {[
              {
                label: "نام",
                name: "firstName",
                placeholder: "مثلاً علی",
                handler: handlePersianInput,
              },
              {
                label: "نام خانوادگی",
                name: "lastName",
                placeholder: "مثلاً محمدی",
                handler: handlePersianInput,
              },
              {
                label: "نام پدر",
                name: "fatherName",
                placeholder: "مثلاً محمد",
                handler: handlePersianInput,
              },
            ].map((field) => (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={[
                  { required: true, message: `لطفا ${field.label} را وارد کنید` },
                  {
                    pattern: /^[\u0600-\u06FF\s]{2,30}$/,
                    message: `${field.label} باید فقط حروف فارسی باشد`,
                  },
                ]}
              >
                <Input
                  placeholder={field.placeholder}
                  maxLength={MAX_PERSIAN}
                  onChange={(e) => field.handler(e, MAX_PERSIAN, field.name)}
                  autoComplete="off"
                />
              </Form.Item>
            ))}

            <Form.Item
              label="تاریخ تولد"
              name="birthDate"
              rules={[{ required: true, message: "لطفا تاریخ تولد را انتخاب کنید" }]}
            >
              <DatePicker
                className="w-full"
                placeholder="تاریخ تولد"
                format="YYYY/MM/DD"
                locale={fa_IR}
                style={{ direction: "ltr" }}
                allowClear={false}
                inputReadOnly
              />
            </Form.Item>

            <Form.Item
              label="شماره موبایل"
              name="mobile"
              rules={[
                { required: true, message: "لطفا شماره موبایل را وارد کنید" },
                {
                  pattern: /^09\d{9}$/,
                  message: "شماره موبایل معتبر وارد کنید",
                },
              ]}
            >
              <Input
                placeholder="مثلاً 09123456789"
                maxLength={MAX_MOBILE}
                onChange={(e) =>
                  handleNumericInput(e, MAX_MOBILE, () => {}, "mobile")
                }
                autoComplete="off"
                style={{ direction: "ltr", textAlign: "left" }}
              />
            </Form.Item>

            <Form.Item
              label="کد ملی"
              name="nationalCode"
              rules={[
                { required: true, message: "لطفا کد ملی را وارد کنید" },
                {
                  pattern: /^\d{10}$/,
                  message: "کد ملی باید ۱۰ رقم باشد",
                },
              ]}
            >
              <Input
                placeholder="مثلاً 0012345678"
                maxLength={MAX_NATIONAL}
                onChange={(e) =>
                  handleNumericInput(e, MAX_NATIONAL, () => {}, "nationalCode")
                }
                autoComplete="off"
                style={{ direction: "ltr", textAlign: "left" }}
              />
            </Form.Item>
          </div>

          {/* کپچا حرفه‌ای */}
          <Form.Item
            label="کد امنیتی"
            name="captcha"
            rules={[{ required: true, message: "لطفا کد امنیتی را وارد کنید!" }]}
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="کد امنیتی را وارد کنید"
                className="!w-32 h-10 rounded-lg border border-gray-300 py-2 px-3 text-center"
                maxLength={5}
                autoComplete="off"
              />

              <button
                type="button"
                className="h-10 rounded-lg text-blue-600 hover:text-blue-700 bg-transparent border-none p-0 flex items-center justify-center"
                onClick={() => refetch()}
              >
                <Icon icon="mdi:refresh" className="text-2xl" />
              </button>

              <div className="flex-1 h-10 relative rounded-lg border border-gray-300 overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center text-sm text-gray-600 font-semibold">
                    در حال دریافت کد امنیتی...
                  </div>
                ) : (
                  <img
                    src={
                      data?.captchaImageUrl ||
                      "https://via.placeholder.com/100x40?text=CAPTCHA"
                    }
                    alt="کد امنیتی"
                    className="w-full h-full object-fill rounded-lg"
                  />
                )}
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="!bg-sky-800 hover:!bg-sky-900 rounded-lg py-2 font-bold text-base"
              style={{ boxShadow: "0 2px 8px rgba(30,64,175,0.09)" }}
            >
              ثبت نام
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <span className="text-gray-600">قبلاً ثبت نام کرده‌اید؟ </span>
          <span
            onClick={() => navigate("/user2/login")}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer"
          >
            ورود به حساب کاربری
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
