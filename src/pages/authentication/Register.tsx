import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import fa_IR from "antd/es/date-picker/locale/fa_IR";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // فقط برای کنترل تعداد کاراکترهای موبایل و کد ملی
  const [mobileCount, setMobileCount] = useState(0);
  const [nationalCount, setNationalCount] = useState(0);

  const MAX_MOBILE = 11;
  const MAX_NATIONAL = 10;
  const MAX_PERSIAN = 30;

  // دستورات ساده برای شمارش و محدودیت ورودی‌ها
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
    // navigate("/dashboard"); // در صورت نیاز
  };

  return (
    <div className="flex  bg-white p-4 rounded-lg shadow-lg md:shadow-none md:bg-transparent justify-center items-center ">
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

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4 !w-full"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="نام"
              name="firstName"
              rules={[
                { required: true, message: "لطفا نام را وارد کنید" },
                {
                  pattern: /^[\u0600-\u06FF\s]{2,30}$/,
                  message: "نام باید فقط حروف فارسی (۲ تا ۳۰ حرف) باشد",
                },
              ]}
            >
              <Input
                placeholder="مثلاً علی"
                maxLength={MAX_PERSIAN}
                onChange={(e) => handlePersianInput(e, MAX_PERSIAN, "firstName")}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              label="نام خانوادگی"
              name="lastName"
              rules={[
                { required: true, message: "لطفا نام خانوادگی را وارد کنید" },
                {
                  pattern: /^[\u0600-\u06FF\s]{2,30}$/,
                  message: "نام خانوادگی باید فقط حروف فارسی باشد",
                },
              ]}
            >
              <Input
                placeholder="مثلاً محمدی"
                maxLength={MAX_PERSIAN}
                onChange={(e) => handlePersianInput(e, MAX_PERSIAN, "lastName")}
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              label="نام پدر"
              name="fatherName"
              rules={[
                { required: true, message: "لطفا نام پدر را وارد کنید" },
                {
                  pattern: /^[\u0600-\u06FF\s]{2,30}$/,
                  message: "نام پدر باید فقط حروف فارسی باشد",
                },
              ]}
            >
              <Input
                placeholder="مثلاً محمد"
                maxLength={MAX_PERSIAN}
                onChange={(e) => handlePersianInput(e, MAX_PERSIAN, "fatherName")}
                autoComplete="off"
              />
            </Form.Item>

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
                onChange={(e) => handleNumericInput(e, MAX_MOBILE, setMobileCount, "mobile")}
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
                onChange={(e) => handleNumericInput(e, MAX_NATIONAL, setNationalCount, "nationalCode")}
                autoComplete="off"
                style={{ direction: "ltr", textAlign: "left" }}
              />
            </Form.Item>
          </div>

          {/* کپچا ساده مثل نمونه تو */}
          <Form.Item
            label="کپچا"
            name="captcha"
            rules={[{ required: true, message: "لطفا کپچا را وارد کنید!" }]}
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="کپچا را وارد کنید"
                className="w-32 flex-1 h-10 rounded-lg border border-gray-300 py-2 px-3 text-center"
                maxLength={5}
                autoComplete="off"
              />
              <button
                type="button"
                className="h-10 rounded-lg text-blue-600 hover:text-blue-700 bg-transparent border-none p-0 flex items-center justify-center"
                onClick={() => alert("رفرش کپچا (در اینجا بدون لاجیک)")}
              >
                <Icon icon="mdi:refresh" className="text-2xl" />
              </button>
              <div className="w-32 flex-1 h-10">
                <img
                  src="https://via.placeholder.com/100x40?text=CAPTCHA"
                  alt="کپچا"
                  className="w-full h-full object-cover rounded-lg border border-gray-300"
                />
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
