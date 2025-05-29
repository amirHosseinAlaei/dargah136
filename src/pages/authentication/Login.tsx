import { Form, Input, Button } from "antd";

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
<<<<<<< HEAD
    <div className="rounded-2xl p-4 shadow-2xl bg-white flex flex-col lg:flex-row max-w-full lg:max-w-4xl h-auto min-h-[85vh] lg:h-[80vh] mt-2 mx-auto border border-gray-200 overflow-hidden">
      {/* بخش سمت چپ */}
      <div className="w-full lg:w-1/3 p-4 text-center flex flex-col justify-center space-y-5 md:space-y-10">
        {/* لوگو */}
        <div className="mt-2">
=======
    <div
      className="
        rounded-lg bg-gradient-to-br from-white via-gray-50 to-slate-100 p-6 shadow-lg bg-white
        flex flex-col lg:flex-row w-[90vw] lg:w-[48vw]
        max-h-[85vh] lg:h-[58vh]
        overflow-y-auto
        -mt-16 lg:mt-4 mx-auto
      "
    >
      {/* بخش سمت چپ */}
      <div className="w-full lg:w-1/3 p-4 text-center flex flex-col justify-center space-y-3 md:space-y-7">
        <div className="-mt-8 ">
>>>>>>> 6084325a6c3ba225b5b44ca3af8bd73908dc6b27
          <img
            src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
            alt="Logo"
            className="w-28 mt-5 md:mt-auto md:w-44 mx-auto drop-shadow-xl"
          />
        </div>
<<<<<<< HEAD
        {/* متن و لینک */}
        <div className="text-[#00365a] space-y-2 md:space-y-5">
          <p className="font-bold text-base md:text-lg">درگاه یکپارچه سازمان بازرسی کل کشور</p>
          <a
            className="font-extrabold text-blue-700 hover:text-blue-900 transition"
            href="https://136.bazresi.ir/dargah/dashboard2/guest"
            target="_blank"
            rel="noopener noreferrer"
          >
=======
        <div className="text-[#00365a] space-y-1 md:space-y-4">
          <p>درگاه یکپارچه سازمان بازرسی کل کشور</p>
          <a className="font-black" href="https://136.bazresi.ir/dargah/dashboard2/guest">
>>>>>>> 6084325a6c3ba225b5b44ca3af8bd73908dc6b27
            www.136.ir
          </a>
        </div>
      </div>

      <div
<<<<<<< HEAD
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
=======
        className=" 
          hidden lg:block
          lg:border-dashed
          my-8 w-full h-0
          lg:border-t-0 lg:border-1 lg:border-gray-200
          lg:w-0 lg:h-auto lg:my-0 lg:mx-8
        "
      ></div>

      {/* بخش فرم */}
      <div className="flex-1 -mt-2 p-4 flex lg:items-center justify-center">
        <Form
          name="login"
          layout="vertical"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
        >
          <p className="hidden lg:block font-extrabold text-slate-700">ورود</p>
          <br className="hidden lg:block" />
          <Form.Item
            label="نام کاربری"
            name="username"
            rules={[{ required: true, message: "لطفا نام کاربری را وارد کنید!" }]}
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
            <Button
              className="!bg-sky-900 !shadow-lg  !font-extrabold  !p-5  hover:!duration-300 hover:!bg-sky-950"
              type="primary"
              htmlType="submit"
              block
            >
              ورود
            </Button>
          </Form.Item>
          <Form.Item>
            <Button className="!p-5 !-mt-2   !border-none !text-slate-700  !font-extrabold  hover:!text-slate-600 !shadow " type="default" block>
              ثبت نام شهروند
            </Button>
          </Form.Item>
          <div className="flex justify-between px-2">
            <a
              href="https://example.com/forgot-password"
              target="_blank"
              rel="noopener noreferrer"
              className="!underline   hover:!text-blue-800"
            >
              فراموشی رمز عبور
            </a>
            <br />
            <a
              href="https://example.com/change-phone"
              target="_blank"
              rel="noopener noreferrer"
              className="!underline  hover:!text-blue-800"
            >
              تغییر شماره تلفن
            </a>
          </div>
          <div className="flex items-center  mt-1">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 whitespace-nowrap text-sm">
              ورود از طریق
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex gap-4 mt-2 w-full max-w-sm mx-auto rtl:space-x-reverse">
            <a
              href="https://136.bazresi.ir/dargah/assets/logos/dolatMan.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex  gap- flex-1 justify-center items-center border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 hover:!text-blue-600 transition space-x-2 rtl:space-x-reverse"
            >
              <img
                src="https://136.bazresi.ir/dargah/assets/logos/dolatMan.png"
                alt="دولت من"
                className="w-6  h-6 object-contain"
              />
              <span className="text-sm !font-extrabold text-gray-600">دولت من</span>
            </a>
            <a
              href="https://136.bazresi.ir/dargah/assets/logos/sanalogo.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1.5 flex-1 justify-center items-center border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 hover:!text-blue-600 transition space-x-2 rtl:space-x-reverse"
            >
              <img
                src="https://136.bazresi.ir/dargah/assets/logos/sanalogo.png"
                alt="ثنا قوه قضاییه"
                className="w-6 h-6 object-contain"
              />
              <span className="text-sm  !font-extrabold text-gray-600">ثنا قوه قضاییه</span>
            </a>
          </div>
        </Form>
>>>>>>> 6084325a6c3ba225b5b44ca3af8bd73908dc6b27
      </div>
    </div>
  );
}

export default Login;
