import { Avatar, Button, Dropdown, Menu } from "antd";
import ShowDate from "../utils/ShowDate";
import SvgLanding from "../utils/SvgLanding";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const mobileMenu = (
    <Menu>
      <Menu.Item key="register">
        <Button
          type="text"
          className="!bg-[#184e90] hover:!bg-[#184e90b6] !p-5 !rounded-3xl !text-white w-full"
          block
          onClick={() => navigate("/user2/register")}
        >
          ثبت نام شهروند
        </Button>
      </Menu.Item>
      <Menu.Item key="login">
        <Button
          type="text"
          className="!bg-[#17a2b8] hover:!bg-[#17a3b8bb] !p-5 !rounded-3xl !text-white w-full"
          block
          onClick={() => navigate("/user2/login")}
        >
          ورود به حساب
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Navbar */}
      <div className="bg-[#00375c] fixed top-0 left-0 w-full z-50 flex justify-center">
        <div className="w-full lg:w-[75%] lg:!mt-12 lg:min-w-[1100px] p-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <img
              className="max-w-14"
              src="https://136.bazresi.ir/dargah/assets/img/Logo136.f920000b.png"
              alt="لوگو"
            />
            <div className="text-sm flex gap-1 lg:font-semibold lg:text-lg whitespace-nowrap">
              درگاه سامانه‌های یکپارچه <span className="hidden lg:block">سازمان بازرسی کل کشور</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <Button
                type="text"
                className="!bg-[#184e90] hover:!bg-[#184e90b6] hover:!duration-400 !p-5 hover:!shadow-lg !cursor-pointer !rounded-3xl !text-white"
                onClick={() => navigate("/user2/register")}
              >
                ثبت نام شهروند
              </Button>
              <Button
                type="text"
                className="!bg-[#17a2b8] hover:!bg-[#17a3b8bb] hover:!duration-400 !p-5 hover:!shadow-lg !cursor-pointer !rounded-3xl !text-white"
                onClick={() => navigate("/user2/login")}
              >
                ورود به حساب
              </Button>
            </div>
            {/* بخش موبایل */}
            <div className="flex text-sm items-center gap-2 lg:hidden">
              <span>کاربر مهمان</span>
              <Dropdown
                overlay={mobileMenu}
                trigger={['click']}
                placement="bottomRight"
                arrow
              >
                <Avatar
                  className="!p-1.5 !cursor-pointer"
                  icon={<Icon icon="fa-solid:user" style={{ fontSize: "24px" }} />}
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-screen w-full pt-16 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full hidden lg:block z-0"
          style={{ height: "40%", backgroundColor: "#00375c" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full bg-cover bg-center hidden lg:block z-0"
          style={{
            height: "60%",
            backgroundImage:
              "url('https://136.bazresi.ir/dargah/assets/img/bg.8a1a09b9.svg')",
          }}
        ></div>

        <div className="hidden lg:flex flex-col items-center justify-center h-full relative z-10">
          <div
            className="rounded-2xl flex flex-col shadow-lg overflow-hidden max-w-none w-[75%] my-12"
            style={{ minWidth: 1100, height: "80vh" }}
          >
            <div className="flex bg-white rounded-md flex-1 overflow-hidden">
              <div className="flex-[4] p-10 overflow-auto relative">
                <Outlet />
              </div>
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
                  <div className="absolute inset-0 bg-opacity-50"></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-14 pointer-events-none">
                    <div className="-mt-8">
                      <SvgLanding />
                      <h2 className="text-white text-center !mt-5 font-bold">www.136.ir</h2>
                    </div>
                  </div>
                  <ShowDate />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* فقط outlet برای موبایل */}
        <div className="lg:hidden p-4 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;