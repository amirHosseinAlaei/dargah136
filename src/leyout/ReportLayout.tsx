import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

function ReportLayout() {
  return (
    <Layout className="  font-sans !bg-white">
      <Content className="flex flex-col items-center justify-center px-8 py-16">
        {/* Container اصلی فرم */}
        <div
          className="
            rounded-xl 
            w-full 
            p-4
            transition-shadow
            duration-300
          "
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default ReportLayout;
