import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function ReportLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dargah/dashboard2/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md px-4 lg:px-8 py-4 flex items-center justify-between">

        <div  className="flex  items-center justify-center gap-3">

          <img className="size-12 lg:size-14 shadow-lg rounded-lg " src="	https://136.bazresi.ir/dargah/assets/img/Logo136.f920000b.png" alt="" />
        <h1 className="lg:text-xl font-bold flex gap-1 text-gray-800">  سامانه گزارش فساد <span className="hidden md:block">سازمان بازرسی کل کشور</span></h1>


        </div>
        <button
          className="flex items-center gap-1 lg:gap-2 bg-[#00598A] hover:bg-[#004c8a] text-white lg:font-medium rounded-lg px-2 lg:px-4 py-2 transition-colors duration-300"
          onClick={handleBack}
        >
          بازگشت  <div className="hidden lg:block">
            به داشبورد
          </div>
          <Icon icon="mdi:arrow-left" className="text-lg" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ReportLayout;
