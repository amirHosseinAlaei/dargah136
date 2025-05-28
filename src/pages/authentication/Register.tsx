import { Form, Input, Button, DatePicker } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import fa_IR from "antd/es/date-picker/locale/fa_IR";
import { Icon } from "@iconify/react/dist/iconify.js";

function Register() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleNumberInput = (e, maxLen) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, maxLen);
    e.target.value = value;
    return value;
  };

  return (
    <div
      className=" 
      rounded-2xl p-3 sm:p-6   !shadow-2xl bg-gradient-to-br from-white via-gray-50 to-slate-100
      flex flex-col
      w-[80vw] sm:w-full sm:max-w-screen-sm
      min-h-[400px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[420px]
      mx-auto "
      style={{ boxSizing: "border-box" }}
    >
      <div className="flex-1   -mt-2 p-2 sm:p-4 flex flex-col">
        {/* هدر بالای فرم */}
        <div className="flex  flex-row justify-between items-center mb-8">
          <span className="text-xl font-bold text-gray-700">ثبت نام</span>
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            title="بازگشت"
          >
        <Icon icon="mdi:arrow-left" className="text-xl cursor-pointer text-gray-600" />

          </button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 w-full"
          style={{ direction: "rtl", fontFamily: "inherit" }}
        >
          {/* نام */}
          <Form.Item
            label={
              <span className="font-semibold  text-slate-700 text-base">
                نام
              </span>
            }
            name="firstName"
            className="mb-2"
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
              size="large"
              className="rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base"
            />
          </Form.Item>

          {/* نام خانوادگی */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 text-base">
                نام خانوادگی
              </span>
            }
            name="lastName"
            className="mb-2"
            rules={[
              { required: true, message: "لطفا نام خانوادگی را وارد کنید" },
              {
                pattern: /^[\u0600-\u06FF\s]{2,30}$/,
                message: "نام خانوادگی باید فقط حروف فارسی (۲ تا ۳۰ حرف) باشد",
              },
            ]}
          >
            <Input
              placeholder="مثلاً محمدی"
              size="large"
              className="rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base"
            />
          </Form.Item>

          {/* نام پدر */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 text-base">
                نام پدر
              </span>
            }
            name="fatherName"
            className="mb-2"
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
              size="large"
              className="rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base"
            />
          </Form.Item>

          {/* تاریخ تولد */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 text-base">
                تاریخ تولد
              </span>
            }
            name="birthDate"
            className="mb-2"
            rules={[
              { required: true, message: "لطفا تاریخ تولد را انتخاب کنید" },
            ]}
          >
            <DatePicker
              className="w-full rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base"
              placeholder="تاریخ تولد"
              format="YYYY/MM/DD"
              locale={fa_IR}
              style={{ direction: "ltr", width: "100%" }}
              size="large"
            />
          </Form.Item>

          {/* شماره موبایل */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 text-base">
                شماره موبایل
              </span>
            }
            name="mobile"
            className="mb-2"
            rules={[
              { required: true, message: "لطفا شماره موبایل را وارد کنید" },
              {
                pattern: /^09(0[1-2]|1[0-9]|2[0-1]|3[0-9]|9[0-9])\d{7}$/,
                message: "شماره موبایل معتبر وارد کنید ",
              },
            ]}
          >
            <Input
              placeholder="مثلاً 09123456789"
              size="large"
              maxLength={11}
              inputMode="numeric"
              className="rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base"
              onChange={(e) => {
                const value = handleNumberInput(e, 11);
                form.setFieldsValue({ mobile: value });
              }}
            />
          </Form.Item>

          {/* کد ملی */}
          <Form.Item
            label={
              <span className="font-semibold text-slate-700 text-base">
                کد ملی
              </span>
            }
            name="nationalCode"
            className="mb-2"
            rules={[
              { required: true, message: "لطفا کد ملی را وارد کنید" },
              { pattern: /^[0-9]{10}$/, message: "کد ملی باید ۱۰ رقم باشد" },
            ]}
          >
            <Input
              placeholder="مثلاً 0012345678"
              size="large"
              maxLength={10}
              inputMode="numeric"
              className="rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base"
              onChange={(e) => {
                const value = handleNumberInput(e, 10);
                form.setFieldsValue({ nationalCode: value });
              }}
            />
          </Form.Item>

          {/* دکمه ارسال */}
          <div className="lg:col-span-2 w-full flex items-center justify-center">
            <Form.Item className="mb-0 w-full">
              <div className=" items-center justify-center flex">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full  sm:w-2/3 md:w-7/6  text-center flex justify-center !bg-sky-900 !shadow-lg !p-5 hover:!duration-300 hover:!bg-sky-950 !-mt-6 rounded-xl font-bold tracking-wide text-lg py-2"
                  size="large"
                >
                  ثبت نام
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
