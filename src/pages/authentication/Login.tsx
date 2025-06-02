import { Form, Input, Button } from "antd";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showCaptcha } from "../../service/Authenticate";

function Login() {
  const nav = useNavigate();

  // واکشی کد امنیتی با react-query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["captcha"],
    queryFn: showCaptcha,
  });

  const onFinish = (values) => {
    console.log("Success:", values);
    // اینجا ارسال اطلاعات ورود یا هر عملیاتی که میخواید انجام بدید
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="
        rounded-2xl p-7 shadow-2xl bg-white flex flex-col lg:flex-row max-w-full lg:max-w-4xl h-auto min-h-[75vh] lg:h-[85vh] -mt-6  lg:mt-2 mx-auto border border-gray-200 overflow-auto
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

            {/* کپچا */}
            <Form.Item
              label={<span className="font-semibold text-gray-700">کد امنیتی</span>}
              name="captcha"
              rules={[{ required: true, message: "لطفا کد امنیتی را وارد کنید!" }]}
            >
              <div className="flex items-center gap-2">
                <Input
                  placeholder="کد امنیتی را وارد کنید"
                  className="!w-32 flex-1 h-10 rounded-lg border border-gray-300 py-2 px-3 text-center"
                  maxLength={5}
                />
                <button
                  type="button"
                  className="h-10 rounded-lg text-blue-600 hover:text-blue-700 bg-transparent border-none p-0 flex items-center justify-center"
                  onClick={() => refetch()}
                >
                  <Icon icon="mdi:refresh" className="text-2xl" />
                </button>
                <div className="!w-48 h-10 flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-500">
                  {isLoading ? (
                    "در حال دریافت کد امنیتی..."
                  ) : error ? (
                    "خطا در دریافت کد امنیتی"
                  ) : data?.captchaImageUrl ? (
                    <img
                      src={data.captchaImageUrl}
                      alt="کد امنیتی"
                      className="w-full h-full !object-fill rounded-lg"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150x40?text=CAPTCHA"
                      alt="کد امنیتی"
                      className="w-full h-full object-cover rounded-lg"
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
                className="!bg-sky-800 hover:!bg-sky-900 py-2 font-bold text-base"
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
                onClick={() => nav("/user2/forget")}
                className="underline hover:text-blue-800 cursor-pointer"
              >
                فراموشی رمز عبور
              </a>
              <a
                onClick={() => nav("/user2/changeNumber")}
                className="underline hover:text-blue-800 cursor-pointer"
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
