import React, { useState } from "react";
import { Button, Dropdown } from "antd";
import ShowDate from "../utils/ShowDate";
import SvgLanding from "../utils/SvgLanding";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
// ts
interface Action {
  key: string;
  label: string;
  icon: string;
  colorClass: string;
  path: string;
  ariaLabel: string;
}
//  actions (Btns)
const ACTIONS: Action[] = [
  {
    key: "register",
    label: "ثبت نام شهروند",
    icon: "mdi:account-plus",
    colorClass:
      "!bg-blue-700 hover:!bg-blue-800 lg:!bg-blue-700/85 lg:hover:!bg-blue-800",
    path: "/user2/register",
    ariaLabel: "ثبت نام شهروند",
  },
  {
    key: "login",
    label: "ورود به حساب",
    icon: "mdi:login",
    colorClass:
      "!bg-slate-600 hover:!bg-slate-700 lg:!bg-sky-800 lg:hover:!bg-sky-900",
    path: "/user2/login",
    ariaLabel: "ورود به حساب",
  },
];
const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //
  const renderActionButton = ({
    label,
    icon,
    colorClass,
    path,
    ariaLabel,
  }: Action) => (
    <Button
      key={label}
      type="text"
      className={`${colorClass} !text-white !border-0 !rounded-lg !px-6 !py-3.5 !h-auto !font-medium !transition-all !duration-200 !shadow-sm flex items-center gap-2`}
      onClick={() => {
        setMobileMenuOpen(false);
        navigate(path);
      }}
      aria-label={ariaLabel}
    >
      <Icon icon={icon} className="text-lg" />
      {label}
    </Button>
  );
  return (
    <>
      {/* Navbar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-1.5">
          <div className="flex justify-between mt-1.5 items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 shadow-lg rounded-xl flex items-center justify-center">
                <img
                  className="w-16 h-14 object-contain"
                  src="https://136.bazresi.ir/dargah/assets/img/Logo136.f920000b.png"
                  alt="لوگو سازمان بازرسی"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-slate-800 font-semibold text-lg">
                  درگاه سامانه‌های یکپارچه
                </h1>
                <p className="text-slate-600 text-sm">سازمان بازرسی کل کشور</p>
              </div>
            </div>
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {ACTIONS.map(renderActionButton)}
            </div>
            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center gap-3">
              <span className="text-slate-600  text-sm">کاربر مهمان</span>
              <Dropdown
                menu={{
                  items: ACTIONS.map((action) => ({
                    key: action.key,
                    label: renderActionButton(action),
                    className: "  !flex justify-center items-center ",
                  })),
                }}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                open={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
              >
                <div
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200"
                  aria-label="منوی کاربر مهمان"
                  tabIndex={0}
                >
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
        {/* Desktop Background */}
        <div
          className="absolute top-0 left-0 w-full hidden lg:block z-0"
          style={{ height: "40%", backgroundColor: "#00375c" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-slate-800/10"></div>
          {/*  line */}
          <div className="absolute inset-0">
            <div className="absolute top-12 left-0 w-48 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            <div className="absolute top-28 right-0 w-32 h-px bg-gradient-to-l from-transparent via-white/12 to-transparent"></div>
            <div className="absolute bottom-16 left-0 w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
          {/* اشکال هندسی */}
          <div className="absolute inset-0">
            <div className="absolute top-16 left-20 w-8 h-8 border border-white/8 rounded-lg rotate-45"></div>
            <div className="absolute top-32 right-24 w-6 h-6 border border-white/6 rounded rotate-12"></div>
            <div className="absolute bottom-20 left-1/3 w-4 h-4 border border-white/5 rounded-sm rotate-45"></div>
          </div>
          {/* header */}
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
        {/* bg-img    */}
        <div
          className="absolute bottom-0 left-0 w-full bg-cover bg-center hidden lg:block z-0"
          style={{
            height: "60%",
            backgroundImage:
              "url('https://136.bazresi.ir/dargah/assets/img/bg.8a1a09b9.svg')",
          }}
          aria-hidden="true"
        ></div>
        {/* Desktop Layout */}
        <div className="hidden lg:block  relative z-10">
          <div className="w-full flex  justify-center px-6 py-8">
            <div
              className="bg-white max-h-[750px]  rounded-2xl shadow-lg overflow-hidden flex w-full max-w-[1200px] min-w-[900px]"
              style={{ height: "calc(100vh - 160px)" }}
            >
              <div className="flex-1 p-8 overflow-auto">
                <Outlet />
              </div>
              {/* Sidebar */}
              <div className="w-80 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative">
                <div className="relative h-full flex flex-col">
                  {/* Top Section */}
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
