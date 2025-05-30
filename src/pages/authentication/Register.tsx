import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import fa_IR from "antd/es/date-picker/locale/fa_IR";
import { Icon } from "@iconify/react/dist/iconify.js";

// الگوریتم صحت کد ملی ایران
function isValidIranianNationalCode(input) {
  if (!/^\d{10}$/.test(input)) return false;
  if (/^(\d)\1{9}$/.test(input)) return false; // رد کدهای تکراری مثل 1111111111
  const check = +input[9];
  const sum =
    input
      .split("")
      .slice(0, 9)
      .reduce((acc, val, i) => acc + +val * (10 - i), 0) % 11;
  return (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);
}

const MAX_MOBILE = 11;
const MAX_NATIONAL = 10;
const MAX_PERSIAN = 30;

function Register() {
  const [form] = Form.useForm();

  // شمارنده برای موبایل و کد ملی
  const [counts, setCounts] = useState({
    mobile: 0,
    nationalCode: 0,
  });

  // کنترل ورودی عددی با شمارنده
  const handleNumericInput = (e, maxLen, field) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > maxLen) value = value.slice(0, maxLen);
    form.setFieldsValue({ [field]: value });
    setCounts((prev) => ({ ...prev, [field]: value.length }));
  };

  // کنترل ورودی فارسی
  const handlePersianInput = (e, maxLen, field) => {
    let value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");
    if (value.length > maxLen) value = value.slice(0, maxLen);
    form.setFieldsValue({ [field]: value });
  };

  React.useEffect(() => {
    setCounts({
      mobile: form.getFieldValue("mobile")?.length || 0,
      nationalCode: form.getFieldValue("nationalCode")?.length || 0,
    });
  }, []);

  const onFinish = (values) => {
    if (values.birthDate)
      values.birthDate = values.birthDate.format("YYYY/MM/DD");
    console.log("Success:", values);
  };

  // استایل شمارنده درون اینپوت
  const suffixCounter = (count, max) => (
    <span className="text-xs text-gray-400 ml-2">{`${count}/${max}`}</span>
  );

  return (
    <div className="flex  justify-center items-center min-h-screen ">
      <div className="bg-white -lg rounded-lg p-4 sm:p-6 md:p-10 space-y-4  max-w-lg mx-auto">
        {/* لوگو و عنوان */}
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
              className=" font-black text-blue-600 hover:text-blue-800 text-sm"
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
          className="space-y-4"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نام */}
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
                name="firstName"
                maxLength={MAX_PERSIAN}
                onChange={(e) =>
                  handlePersianInput(e, MAX_PERSIAN, "firstName")
                }
                autoComplete="off"
              />
            </Form.Item>

            {/* نام خانوادگی */}
            <Form.Item
              label="نام خانوادگی"
              name="lastName"
              rules={[
                { required: true, message: "لطفا نام خانوادگی را وارد کنید" },
                {
                  pattern: /^[\u0600-\u06FF\s]{2,30}$/,
                  message:
                    "نام خانوادگی باید فقط حروف فارسی (۲ تا ۳۰ حرف) باشد",
                },
              ]}
            >
              <Input
                placeholder="مثلاً محمدی"
                name="lastName"
                maxLength={MAX_PERSIAN}
                onChange={(e) => handlePersianInput(e, MAX_PERSIAN, "lastName")}
                autoComplete="off"
              />
            </Form.Item>

            {/* نام پدر */}
            <Form.Item
              label="نام پدر"
              name="fatherName"
              rules={[
                { required: true, message: "لطفا نام پدر را وارد کنید" },
                {
                  pattern: /^[\u0600-\u06FF\s]{2,30}$/,
                  message: "نام پدر باید فقط حروف فارسی (۲ تا ۳۰ حرف) باشد",
                },
              ]}
            >
              <Input
                placeholder="مثلاً محمد"
                name="fatherName"
                maxLength={MAX_PERSIAN}
                onChange={(e) =>
                  handlePersianInput(e, MAX_PERSIAN, "fatherName")
                }
                autoComplete="off"
              />
            </Form.Item>

            {/* تاریخ تولد */}
            <Form.Item
              label="تاریخ تولد"
              name="birthDate"
              rules={[
                { required: true, message: "لطفا تاریخ تولد را انتخاب کنید" },
              ]}
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

            {/* شماره موبایل با شمارنده درون اینپوت */}
            <Form.Item
              label="شماره موبایل"
              name="mobile"
              rules={[
                { required: true, message: "لطفا شماره موبایل را وارد کنید" },
                {
                  pattern: /^09(0[1-2]|1[0-9]|2[0-1]|3[0-9]|9[0-9])\d{7}$/,
                  message: "شماره موبایل معتبر وارد کنید",
                },
              ]}
            >
              <Input
                placeholder="مثلاً 09123456789"
                name="mobile"
                inputMode="numeric"
                maxLength={MAX_MOBILE}
                value={form.getFieldValue("mobile") || ""}
                onChange={(e) => handleNumericInput(e, MAX_MOBILE, "mobile")}
                autoComplete="off"
                suffix={suffixCounter(counts.mobile, MAX_MOBILE)}
                style={{ direction: "ltr", textAlign: "left" }}
              />
            </Form.Item>

            {/* کد ملی با شمارنده درون اینپوت */}
            <Form.Item
              label="کد ملی"
              name="nationalCode"
              rules={[
                { required: true, message: "لطفا کد ملی را وارد کنید" },
                {
                  validator: (_, value) =>
                    !value || isValidIranianNationalCode(value)
                      ? Promise.resolve()
                      : Promise.reject("کد ملی معتبر وارد کنید"),
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input
                placeholder="مثلاً 0012345678"
                name="nationalCode"
                inputMode="numeric"
                maxLength={MAX_NATIONAL}
                value={form.getFieldValue("nationalCode") || ""}
                onChange={(e) =>
                  handleNumericInput(e, MAX_NATIONAL, "nationalCode")
                }
                autoComplete="off"
                suffix={suffixCounter(counts.nationalCode, MAX_NATIONAL)}
                style={{ direction: "ltr", textAlign: "left" }}
              />
            </Form.Item>
          </div>

          {/* دکمه ثبت نام */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold"
            >
              ثبت نام
            </Button>
          </Form.Item>
        </Form>

        {/* لینک بازگشت به ورود */}
        <div className="text-center">
          <span className="text-gray-600">قبلاً ثبت نام کرده‌اید؟ </span>
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            ورود به حساب کاربری
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
