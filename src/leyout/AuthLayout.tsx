import { Outlet } from "react-router-dom";
import { getPersianDateString } from "../utils/ShowDateForm";

function AuthLayout() {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: "url('https://136.bazresi.ir/dargah/assets/img/pivs/31.jpg')",
        backgroundSize: "cover", // تغییر به cover برای پر کردن کل صفحه
        backgroundPosition: "center", // تنظیم موقعیت تصویر
        backgroundColor: "#000" // اضافه کردن رنگ پس‌زمینه برای پر کردن فضای خالی
      }}
    >
      {/* لایه تیره‌کننده */}
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      {/* محتوای اصلی */}
      <div className="relative z-10 flex-grow flex justify-center items-center">
        <div className="p-6 rounded-lg w-fit h-fit mx-4 md:mx-auto">
          <Outlet />
        </div>
      </div>

      {/* نوار پایین */}
      <div className="relative bottom-0 left-0 w-full z-20 flex justify-center">
        <div className="bg-black/50 w-full text-white px-6 py-2 text-lg shadow-lg flex justify-center items-center">
          {getPersianDateString()}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;