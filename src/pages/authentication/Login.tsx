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
    <div className="rounded-lg p-4 shadow-lg bg-white flex flex-col lg:flex-row w-[90vw]  h-[85vh] lg:w-[50vw] lg:h-[80vh] -mt-16 lg:mt-4 mx-auto">
      {/* بخش سمت چپ */}
      <div className="w-full  lg:w-1/3 p-4 text-center flex flex-col justify-center space-y-3 md:space-y-7">
        {/* لوگو */}
        <div className="-mt-8 ">
          <img
            src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
            alt="Logo"
            className=" w-28 mt-5 md:mt-auto md:w-44 mx-auto"
          />
        </div>
        {/* متن و لینک */}
        <div className="text-[#00365a]  space-y-1 md:space-y-4">
          <p>درگاه یکپارچه سازمان بازرسی کل کشور</p>
          <a
            className="font-black"
            href="https://136.bazresi.ir/dargah/dashboard2/guest"
          >
            www.136.ir
          </a>
        </div>
      </div>

      {/* خط جداکننده */}
      <div
        className=" 
        hidden lg:block
          lg:border-dashed
           my-8 w-full h-0
          lg:border-t-0 lg:border-l lg:border-gray-600
          lg:w-0 lg:h-auto lg:my-0 lg:mx-8
        "
      ></div>

      {/* بخش سمت راست */}
   
  <div className="flex-1  -mt-2 p-4 flex lg:items-center justify-center">
  {/* فرم ورود */}
  <Form
    name="login"
    layout="vertical"
    style={{ width: "100%", maxWidth: 350 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    requiredMark={false} 
  >
    <Form.Item
      label="نام کاربری"
      name="username"
      rules={[
        { required: true, message: "لطفا نام کاربری را وارد کنید!" },
      ]}
    >
      <Input placeholder="نام کاربری" />
    </Form.Item>

    <Form.Item
      label="رمز عبور"
      name="password"
      rules={[{ required: true, message: "لطفا رمز عبور را وارد کنید!" }]}
    >
      <Input.Password placeholder="رمز عبور" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" block>
        ورود
      </Button>
    </Form.Item>
  </Form>
</div>

    </div>
  );
}

export default Login;
