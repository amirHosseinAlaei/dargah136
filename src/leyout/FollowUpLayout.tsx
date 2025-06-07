import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { Icon } from "@iconify/react";

const { Header, Content } = Layout;

function FollowUpLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dargah/dashboard2/");
  };

  return (
    <Layout className="h-screen font-sans !bg-gray-100">
    
    
    <header className="bg-white shadow-md px-4 lg:px-8 py-4 flex items-center justify-between">

        <div  className="flex  items-center justify-center gap-3">

          <img className="size-12 lg:size-14 shadow-lg rounded-lg " src="	https://136.bazresi.ir/dargah/assets/img/Logo136.f920000b.png" alt="" />
        <h1 className="lg:text-xl font-bold flex gap-1 text-gray-800">  سامانه پیگیری گزارش فساد <span className="hidden md:block">سازمان بازرسی کل کشور</span></h1>


        </div>
        <button
          className="flex items-center gap-1 lg:gap-1.5 lg:!p-3 cursor-pointer  bg-[#00598A] hover:bg-[#004c8a] text-white lg:font-medium rounded-lg px-2 lg:px-4 py-2 transition-colors duration-300"
          onClick={handleBack}
        >
          بازگشت  <span className="hidden   lg:block">
            به داشبورد
          </span>
          <Icon icon="mdi:arrow-left" className="text-lg" />
        </button>
      </header>


    
      <Content
        className="py-6 px-4 flex justify-center overflow-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="w-full max-w-3xl p-6 sm:p-8 md:p-10 h-full max-h-full flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default FollowUpLayout;
