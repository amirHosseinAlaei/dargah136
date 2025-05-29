import { Avatar, Button, Dropdown, Menu } from "antd";
import ShowDate from "../utils/ShowDate";
import SvgLanding from "../utils/SvgLanding";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const mobileMenu = (
    <Menu className="!border-0 !shadow-xl !rounded-xl">
      <Menu.Item key="register" className="!p-0 !m-1">
        <Button
          type="text"
          className="!bg-blue-700 hover:!bg-blue-800 !text-white !border-0 !rounded-lg !p-4 w-full !font-medium !transition-all !duration-200"
          block
          onClick={() => navigate("/user2/register")}
        >
          <Icon icon="mdi:account-plus" className="ml-2" />
          ثبت نام شهروند
        </Button>
      </Menu.Item>
      <Menu.Item key="login" className="!p-0 !m-1">
        <Button
          type="text"
          className="!bg-slate-600 hover:!bg-slate-700 !text-white !border-0 !rounded-lg !p-4 w-full !font-medium !transition-all !duration-200"
          block
          onClick={() => navigate("/user2/login")}
        >
          <Icon icon="mdi:login" className="ml-2" />
          ورود به حساب
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Minimal Navbar */}
      <div className="bg-white/95  backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section - بهبود بک‌گراند لوگو */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 !shadow-lg  rounded-xl flex items-center justify-center  ">
                <img
                  className="w-16 h-14 object-contain"
                  src="https://136.bazresi.ir/dargah/assets/img/Logo136.f920000b.png"
                  alt="لوگو"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-slate-800 font-semibold text-lg">
                  درگاه سامانه‌های یکپارچه
                </h1>
                <p className="text-slate-600 text-sm">سازمان بازرسی کل کشور</p>
              </div>
            </div>

            {/* Desktop Actions - رنگ‌بندی رسمی و مناسب */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                type="text"
                className="!bg-blue-700/85   hover:!bg-blue-800  !text-white !border-0 !rounded-lg !px-6 !py-3.5 !h-auto !font-medium !transition-all !duration-200 !shadow-sm flex items-center gap-2"
                onClick={() => navigate("/user2/register")}
              >
                <Icon icon="mdi:account-plus" className="text-lg " />
                ثبت نام شهروند
              </Button>
              <Button
                type="text"
                className="!bg-sky-800 hover:!bg-sky-900 !text-white !border-0 !rounded-lg !px-6 !py-3.5 !h-auto !font-medium !transition-all !duration-200 !shadow-sm flex items-center gap-2"
                onClick={() => navigate("/user2/login")}
              >
                <Icon icon="mdi:login" className="text-lg " />
                ورود به حساب
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center gap-3">
              <span className="text-slate-600 text-sm">کاربر مهمان</span>
              <Dropdown
                overlay={mobileMenu}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <div className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200">
                  <Icon
                    icon="heroicons:user"
                    className="text-slate-600 text-lg"
                  />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Background */}
      <div className="relative pt-20 min-h-screen overflow-hidden">
        {/* Professional Background - انیمیشن‌های ساده و رسمی */}
        <div
          className="absolute top-0 left-0 w-full hidden lg:block z-0"
          style={{ height: "40%", backgroundColor: "#00375c" }}
        >
          {/* Subtle Professional Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-slate-800/10"></div>

          {/* Minimal Professional Elements */}
          <div className="absolute inset-0">
            {/* Clean Lines */}
            <div className="absolute top-12 left-0 w-48 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            <div className="absolute top-28 right-0 w-32 h-px bg-gradient-to-l from-transparent via-white/12 to-transparent"></div>
            <div className="absolute bottom-16 left-0 w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          {/* Simple Geometric Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-16 left-20 w-8 h-8 border border-white/8 rounded-lg rotate-45"></div>
            <div className="absolute top-32 right-24 w-6 h-6 border border-white/6 rounded rotate-12"></div>
            <div className="absolute bottom-20 left-1/3 w-4 h-4 border border-white/5 rounded-sm rotate-45"></div>
          </div>

          {/* Professional Header */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-3 text-white/75 text-sm">
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
              <span className="font-light tracking-wide">
                درگاه الکترونیکی خدمات
              </span>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full bg-cover bg-center hidden lg:block z-0"
          style={{
            height: "60%",
            backgroundImage:
              "url('https://136.bazresi.ir/dargah/assets/img/bg.8a1a09b9.svg')",
          }}
        ></div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* حذف بورد سفید و بهبود طراحی */}
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
              style={{ height: "calc(100vh - 160px)" }}
            >
              <div className="flex h-full">
                {/* Content Area */}
                <div className="flex-1 p-8 overflow-auto">
                  <Outlet />
                </div>

                {/* Sidebar */}
                <div className="w-80 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative">
                  {/* Content */}
                  <div className="relative h-full flex flex-col">
                    {/* Top Section - عکس بزرگ‌تر */}
                    <div className="flex-1 flex flex-col justify-center items-center p-6">
                      <div className="text-center">
                        <div className="mb-8 flex justify-center">
                          <div className="w-48 h-48 flex items-center justify-center">
                            <SvgLanding />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-white text-xl font-semibold">
                            www.136.ir
                          </h3>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            پورتال خدمات الکترونیک
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="p-6 border-t border-white/10">
                      <ShowDate />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6 bg-gray-50 min-h-screen">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-140px)] p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
