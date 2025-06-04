import { Form, Input, Button } from "antd";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { showCaptcha } from "../../service/Authenticate";

// اینترفیس کامل پاسخ کپچا
interface CaptchaResponse {
  dntCaptchaId: string;
  captchaImageUrl: string;
  dntCaptchaText: string;
  dntCaptchaToken: string;
}

function ChangeNumber() {
  const { data, error, isLoading, refetch } = useQuery<CaptchaResponse, Error>({
    queryKey: ["captcha"],
    queryFn: showCaptcha,
  });

  const onFinish = (values: {
    nationalId: string;
    phone: string;
    captcha: string;
  }) => {
    console.log("ارسال کد تایید به:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("خطا در فرم:", errorInfo);
  };

  return (
    <div className="rounded-2xl p-6 flex flex-col bg-white max-w-md w-full min-h-[50vh] mt-10 mx-auto overflow-hidden">
      <div className="w-full rounded-xl p-6 flex flex-col justify-center h-full">
        <h2 className="font-extrabold text-slate-700 text-xl mb-6 text-center">
          تغییر شماره تلفن
        </h2>

        <Form
          name="change_number"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={true}
          className="flex-grow"
        >
          <Form.Item
            label="کد ملی"
            name="nationalId"
            rules={[
              { required: true, message: "لطفا کد ملی را وارد کنید!" },
              {
                pattern: /^\d{10}$/,
                message: "کد ملی باید ۱۰ رقم عددی باشد",
              },
            ]}
          >
            <Input
              placeholder="کد ملی"
              className="rounded-lg py-2 px-3"
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            label="شماره همراه"
            name="phone"
            rules={[
              { required: true, message: "لطفا شماره همراه را وارد کنید!" },
              {
                pattern: /^09\d{9}$/,
                message: "شماره همراه باید با 09 شروع شده و 11 رقم باشد",
              },
            ]}
          >
            <Input
              placeholder="شماره همراه"
              className="rounded-lg py-2 px-3"
              maxLength={11}
            />
          </Form.Item>

          <Form.Item
            label="کد امنیتی"
            name="captcha"
            rules={[
              { required: true, message: "لطفا کد امنیتی را وارد کنید!" },
            ]}
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="کد امنیتی را وارد کنید"
                className="!w-32 h-10 rounded-lg border border-gray-300 py-2 px-3 text-center"
                maxLength={5}
              />

              <button
                type="button"
                className="h-10 rounded-lg text-blue-600 hover:text-blue-700 bg-transparent border-none p-0 flex items-center justify-center"
                onClick={() => refetch()}
              >
                <Icon icon="mdi:refresh" className="text-2xl cursor-pointer" />
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
              className="!bg-sky-800 hover:!bg-sky-900 rounded-lg py-2 font-bold text-base"
              style={{ boxShadow: "0 2px 8px rgba(30,64,175,0.09)" }}
            >
              ارسال کد تایید
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangeNumber;
