import { Outlet } from "react-router-dom";
import { getPersianDateString } from "../utils/ShowDateForm";

function AuthLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url('https://136.bazresi.ir/dargah/assets/img/pivs/31.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // این خط مهمه - بک‌گراند رو ثابت نگه می‌داره
      }}
    >
      {/* لایه تیره‌کننده - این هم ثابت می‌مونه */}
      <div className="fixed inset-0 bg-black/60" style={{ zIndex: 1 }}></div>

      {/* محتوای اصلی */}
      <div
        className="relative flex-1 flex items-center justify-center p-4"
        style={{ zIndex: 2 }}
      >
        <div className=" rounded-lg  p-6 w-full ">
          <Outlet />
        </div>
      </div>

      {/* نوار پایین */}
      <footer
        className="relative bg-black/70 text-white text-center py-3"
        style={{ zIndex: 2 }}
      >
        {getPersianDateString()}
      </footer>
    </div>
  );
}

export default AuthLayout;
