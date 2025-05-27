import { Outlet } from "react-router-dom";
import { getPersianDateString } from "../utils/ShowDateForm"; // مسیر را طبق پروژه خود تنظیم کن

function AuthLayout() {
  return (
    <div
      className="relative h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('https://136.bazresi.ir/dargah/assets/img/pivs/31.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* لایه تیره‌کننده */}
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      {/* محتوای اصلی */}
      <div className="relative z-10 p-6 rounded-lg  w-fit h-fit mx-4 md:mx-auto">
        <Outlet />
      </div>

      {/* نوار پایین */}
      <div className="fixed bottom-0 left-0 w-full z-20 flex justify-center">
        <div className="bg-black/50 w-full text-white px-6 py-2 text-lg shadow-lg flex justify-center items-center">
          {getPersianDateString()}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
