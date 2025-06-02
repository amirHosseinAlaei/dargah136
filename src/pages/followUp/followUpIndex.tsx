import { Form, Input, Button } from "antd";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { showCaptcha } from "../../service/Authenticate"; // اطمینان از موجود بودن این سرویس

function FollowUpIndex() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["captcha_followup"],
    queryFn: showCaptcha,
  });

  const onFinish = (values) => {
    console.log("اطلاعات ارسال شد:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("خطا در فرم:", errorInfo);
  };

  return (
    <div
      className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-md"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <h2 className="font-extrabold text-slate-700 text-2xl mb-6 text-center">
        پیگیری سفارش
      </h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm">
          خطا در دریافت کد امنیتی
        </div>
      )}

      <Form
        name="tracking_form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={true}
      >
        <Form.Item
          label="شماره رهگیری"
          name="trackingNumber"
          rules={[{ required: true, message: "لطفا شماره رهگیری را وارد کنید!" }]}
        >
          <Input placeholder="شماره رهگیری" className="rounded-lg py-2 px-3" />
        </Form.Item>

        <Form.Item
          label="کد امنیتی"
          name="captcha"
          rules={[{ required: true, message: "لطفا کد امنیتی را وارد کنید!" }]}
        >
          <div className="flex items-center gap-2">
            <Input
              placeholder="کد امنیتی"
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
            ارسال
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FollowUpIndex;
