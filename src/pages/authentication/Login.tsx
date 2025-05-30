import { Form, Input, Button } from "antd";

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="
        rounded-2xl p-4 shadow-2xl bg-white flex flex-col lg:flex-row max-w-full lg:max-w-4xl h-auto min-h-[85vh] lg:h-[80vh] mt-2 mx-auto border border-gray-200 overflow-hidden
      "
    >
      {/* بخش سمت چپ */}
      <div className="w-full lg:w-1/3 p-4 text-center flex flex-col justify-center space-y-5 md:space-y-10 bg-white">
        <div className="mt-2">
          <img
            src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
            alt="Logo"
            className="w-28 mt-5 md:mt-auto md:w-44 mx-auto drop-shadow-xl"
          />
        </div>
        <div className="text-[#00365a] space-y-2 md:space-y-5">
          <p className="font-bold text-base md:text-lg">
            درگاه یکپارچه سازمان بازرسی کل کشور
          </p>
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

      {/* خط جداکننده در دسکتاپ */}
      <div className="hidden lg:block lg:border-dashed lg:border-l lg:border-gray-300 lg:mx-4"></div>

      {/* بخش فرم ورود */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md rounded-xl p-4 sm:p-8 mx-auto bg-white">
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
          >
            <p className="hidden lg:block font-extrabold text-slate-700 text-xl mb-4">
              ورود
            </p>
            <Form.Item
              label={
                <span className="font-semibold text-gray-700">نام کاربری</span>
              }
              name="username"
              rules={[
                { required: true, message: "لطفا نام کاربری را وارد کنید!" },
              ]}
            >
              <Input
                placeholder="نام کاربری"
                className="rounded-lg py-2 px-3"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-semibold text-gray-700">رمز عبور</span>
              }
              name="password"
              rules={[
                { required: true, message: "لطفا رمز عبور را وارد کنید!" },
              ]}
            >
              <Input.Password
                placeholder="رمز عبور"
                className="rounded-lg py-2 px-3"
              />
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
            <Form.Item>
              <Button
                type="default"
                block
                className="!p-3 !border-none !text-slate-700 !font-extrabold hover:!text-slate-600 !shadow"
              >
                ثبت نام شهروند
              </Button>
            </Form.Item>
            <div className="flex justify-between px-2">
              <a
                href="https://example.com/forgot-password"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-800"
              >
                فراموشی رمز عبور
              </a>
              <a
                href="https://example.com/change-phone"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-800"
              >
                تغییر شماره تلفن
              </a>
            </div>
            <div className="flex items-center mt-4 mb-2">
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
                className="flex flex-1 justify-center items-center border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 hover:text-blue-600 transition"
              >
                <img
                  src="https://136.bazresi.ir/dargah/assets/logos/dolatMan.png"
                  alt="دولت من"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm font-extrabold text-gray-600 ml-2">
                  دولت من
                </span>
              </a>
              <a
                href="https://136.bazresi.ir/dargah/assets/logos/sanalogo.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 justify-center items-center border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 hover:text-blue-600 transition"
              >
                <img
                  src="https://136.bazresi.ir/dargah/assets/logos/sanalogo.png"
                  alt="ثنا قوه قضاییه"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-sm font-extrabold text-gray-600 ml-2">
                  ثنا قوه قضاییه
                </span>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
