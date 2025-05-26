import { Button } from "antd";
import GreetingDate from "../utils/ShowDate";
import ShowDate from "../utils/ShowDate";
import SvgLanding from "../utils/SvgLanding";

const DashboardLayout = () => {
  return (
    <div className="relative h-screen w-full bg-gray-100">
      {/* بخش آبی بالا 40% ارتفاع */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{ height: "40%", backgroundColor: "#0a2540" }}
      ></div>

      {/* بخش پایین 60% ارتفاع با تصویر پس‌زمینه */}
      <div
        className="absolute bottom-0 left-0 w-full bg-cover bg-center"
        style={{
          height: "60%",
          backgroundImage:
            "url('https://136.bazresi.ir/dargah/assets/img/bg.8a1a09b9.svg')",
        }}
      ></div>

      {/* بخش وسط به صورت لایه‌ای روی آبی و زرد */}
      <div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
 rounded-2xl flex flex-col overflow-hidden max-w-none w-[85%] h-[75vh]"
        style={{ minWidth: 1100 }}
      >
        {/* بخش بالایی با پس‌زمینه آبی و متن سلام */}
        <div className="w-full bg flex justify-between text-white px-1 py-3 font-semibold text-lg">
          <div>درگاه سامانه‌های یکپارچه سازمان بازرسی کل کشور</div>

          <div className="flex justify-end gap-2">
            <Button>ورود به حساب</Button>
            <Button>ثبت نام شهروند</Button>
          </div>
        </div>

        {/* بخش محتوا به صورت افقی با دو بخش چپ و راست */}
        <div className="flex bg-white rounded-md flex-1 overflow-hidden">
          {/* سمت چپ محتوا */}
          <div className="flex-[4] p-10 overflow-auto relative">
            <h1 className="text-left text-gray-800 mt-16 mb-10 font-semibold text-2xl">
              درگاه سامانه‌های یکپارچه سازمان بازرسی کل کشور
            </h1>

            {/* کارت‌ها */}
            <div className="grid grid-cols-3 gap-8 justify-items-center">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow cursor-pointer hover:shadow-lg transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                  alt="تماس با 136"
                  className="w-12 h-12 mb-2 opacity-50"
                />
                <p className="text-xs text-center">تماس با 136</p>
              </div>
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow cursor-pointer hover:shadow-lg transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2913/2913992.png"
                  alt="سامانه ملی انتشار"
                  className="w-12 h-12 mb-2 opacity-50"
                />
                <p className="text-xs text-center">
                  سامانه ملی انتشار و دسترسی آزاد به اطلاعات
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow cursor-pointer hover:shadow-lg transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2913/2913996.png"
                  alt="پایگاه اطلاع رسانی"
                  className="w-12 h-12 mb-2 opacity-50"
                />
                <p className="text-xs text-center">پایگاه اطلاع رسانی سازمان</p>
              </div>
            </div>
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
              <div className="absolute  inset-0 flex flex-col justify-center items-center p-14 pointer-events-none">
                <div className="-mt-8">
                  <SvgLanding/>
                  <h2 className="text-white text-center font-bold">
                    www.136.ir
                  </h2>
                </div>
              </div>

              {/* متن در پایین */}
              <ShowDate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
