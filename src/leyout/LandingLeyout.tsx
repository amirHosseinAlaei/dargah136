import { Avatar, Button } from "antd";
import ShowDate from "../utils/ShowDate";
import SvgLanding from "../utils/SvgLanding";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

const DashboardLayout = () => {
  return (
    <>
      {/* نوار بالای فیکس شده */}
      <div className="bg-[#00375c] fixed top-0 left-0 w-full p-3 text-white flex justify-between z-50">
        <div className="flex items-center gap-2">
          <img
            className="max-w-16"
            src="https://136.bazresi.ir/dargah/assets/img/Logo136.f920000b.png"
            alt=""
          />
          <p>درگاه سامانه های یکپارچه </p>
        </div>
        <div className="flex items-center gap-3">
          <div>کاربر مهمان</div>
          <Avatar
            className="!p-1.5"
            icon={<Icon icon="fa-solid:user" style={{ fontSize: "24px" }} />}
          />
        </div>
      </div>

      {/* بخش اصلی صفحه با padding-top برابر ارتفاع نوار (مثلا 56px) */}
      <div className="relative h-screen w-full pt-14">
        {/* بخش آبی بالا 40% ارتفاع - فقط از lg به بالا نمایش داده شود */}
        <div
          className="absolute top-0 left-0 w-full hidden lg:block"
          style={{ height: "40%", backgroundColor: "#00375c" }}
        ></div>

        {/* بخش پایین 60% ارتفاع با تصویر پس‌زمینه - فقط از lg به بالا نمایش داده شود */}
        <div
          className="absolute bottom-0 left-0 w-full bg-cover bg-center hidden lg:block"
          style={{
            height: "60%",
            backgroundImage:
              "url('https://136.bazresi.ir/dargah/assets/img/bg.8a1a09b9.svg')",
          }}
        ></div>

        {/* بخش وسط به صورت لایه‌ای روی آبی و زرد */}
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col overflow-hidden max-w-none w-[85%] h-[75vh] hidden lg:flex"
          style={{ minWidth: 1100 }}
        >
          {/* بخش بالایی با پس‌زمینه آبی و متن سلام */}
          <div className="w-full bg flex justify-between text-white px-1 py-3 font-semibold text-lg">
            <div>درگاه سامانه‌های یکپارچه سازمان بازرسی کل کشور</div>

            <div className="flex justify-end gap-2">
              <Button
                type="text"
                className="!bg-[#184e90]  hover:!bg-[#184e90b6] hover:!duration-400 !p-5 hover:!shadow-lg !cursor-pointer !rounded-3xl !text-white "
              >
                ثبت نام شهروند
              </Button>
              <Button
                type="text"
                className="!bg-[#17a2b8]  hover:!bg-[#17a3b8bb] hover:!duration-400 !p-5 hover:!shadow-lg !cursor-pointer !rounded-3xl !text-white "
              >
                ورود به حساب
              </Button>
            </div>
          </div>

          {/* بخش محتوا به صورت افقی با دو بخش چپ و راست */}
          <div className="flex bg-white rounded-md flex-1 overflow-hidden">
            {/* سمت چپ محتوا */}
            <div className="flex-[4] p-10 overflow-auto relative">
              <Outlet />
            </div>

            {/* سمت راست با بک‌گراند عکس */}
            <div
              className="flex-[1] bg-cover bg-center relative"
              style={{
                backgroundImage:
                  "url('https://d41chssnpqdne.cloudfront.net/user_upload_by_module/chat_bot/files/135456434/vVkzMbNqxOpMSvci.png')",
              }}
            >
              <div
                className="flex-[1] h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://136.bazresi.ir/dargah/assets/img/bg2.67b95ed1.jpg')
          `,
                }}
              >
                {/* لایه پوششی برای تیره کردن عکس */}
                <div className="absolute inset-0 bg-opacity-50"></div>

                {/* SVG در وسط */}
                <div className="absolute inset-0 flex flex-col justify-center items-center p-14 pointer-events-none">
                  <div className="-mt-8">
                    <SvgLanding />
                    <h2 className="text-white text-center font-bold">www.136.ir</h2>
                  </div>
                </div>

                {/* متن در پایین */}
                <ShowDate />
              </div>
            </div>
          </div>
        </div>

        {/* فقط بخش outlet برای نمایش در سایزهای کوچک‌تر از lg */}
        <div className="lg:hidden p-4 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
