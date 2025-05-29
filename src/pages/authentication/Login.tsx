import React from "react";
import { Form, Input, Button } from "antd";

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
    // اینجا می‌تونی درخواست ورود رو ارسال کنی
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="rounded-2xl p-4 shadow-2xl bg-white flex flex-col lg:flex-row max-w-full lg:max-w-4xl h-auto min-h-[85vh] lg:h-[80vh] mt-2 mx-auto border border-gray-200 overflow-hidden">
      {/* بخش سمت چپ */}
      <div className="w-full lg:w-1/3 p-4 text-center flex flex-col justify-center space-y-5 md:space-y-10">
        {/* لوگو */}
        <div className="mt-2">
          <img
            src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
            alt="Logo"
            className="w-28 mt-5 md:mt-auto md:w-44 mx-auto drop-shadow-xl"
          />
        </div>
        {/* متن و لینک */}
        <div className="text-[#00365a] space-y-2 md:space-y-5">
          <p className="font-bold text-base md:text-lg">درگاه یکپارچه سازمان بازرسی کل کشور</p>
          <a
            className="font-extrabold text-blue-700 hover:text-blue-900 transition"
            href="https://136.bazresi.ir/dargah/dashboard2/guest"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.136.ir
          </a>
        </div>
      </div>

      {/* خط جداکننده */}
      <div
        className="hidden lg:block lg:border-dashed lg:border-l lg:border-gray-300 lg:mx-4"
      ></div>

      {/* بخش سمت راست */}
      <div className="flex-1 flex items-center justify-center">
        {/* فرم ورود */}
        <div className="w-full max-w-xs sm:max-w-sm bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
          >
            <Form.Item
              label={<span className="font-semibold text-gray-700">نام کاربری</span>}
              name="username"
              rules={[
                { required: true, message: "لطفا نام کاربری را وارد کنید!" },
              ]}
            >
              <Input placeholder="نام کاربری" className="rounded-lg py-2 px-3" />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-gray-700">رمز عبور</span>}
              name="password"
              rules={[{ required: true, message: "لطفا رمز عبور را وارد کنید!" }]}
            >
              <Input.Password placeholder="رمز عبور" className="rounded-lg py-2 px-3" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-blue-700 hover:bg-blue-800 rounded-lg py-2 font-bold text-base"
                style={{ boxShadow: "0 2px 8px rgba(30,64,175,0.09)" }}
              >
                ورود
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
