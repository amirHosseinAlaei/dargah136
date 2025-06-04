
function LoginSkeleton() {
  return (
    <div
      className="
        rounded-2xl p-7 shadow-2xl bg-white flex flex-col lg:flex-row max-w-full lg:max-w-4xl h-auto min-h-[75vh] lg:h-[85vh] -mt-6  lg:mt-2 mx-auto border border-gray-200 overflow-auto
      "
    >
      {/* بخش سمت چپ (لوگو و توضیحات) */}
      <div className="w-full lg:w-1/3 p-4 text-center flex flex-col justify-center space-y-5 md:space-y-10 bg-white">
        <div className="mt-2 flex justify-center">
          <div className="w-28 h-20 md:w-44 md:h-28 bg-gray-200 rounded-2xl shimmer" />
        </div>
        <div className="space-y-2 md:space-y-5">
          <div className="h-5 w-40 mx-auto bg-gray-200 rounded shimmer" />
          <div className="h-4 w-24 mx-auto bg-gray-200 rounded shimmer" />
        </div>
      </div>

      {/* خط جداکننده در دسکتاپ */}
      <div className="hidden lg:block lg:border-dashed lg:border-l lg:border-gray-300 lg:mx-4"></div>

      {/* بخش فرم ورود */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md rounded-xl p-4 sm:p-8 mx-auto bg-white">
          <form>
            <div className="hidden lg:block font-extrabold text-slate-700 text-xl mb-4 h-8 w-24 bg-gray-200 rounded shimmer" />

            {/* نام کاربری */}
            <div className="mb-4">
              <div className="h-5 w-20 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-200 rounded-lg shimmer" />
            </div>

            {/* رمز عبور */}
            <div className="mb-4">
              <div className="h-5 w-20 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-200 rounded-lg shimmer" />
            </div>

            {/* کپچا */}
            <div className="mb-4">
              <div className="h-5 w-20 mb-2 bg-gray-200 rounded shimmer" />
              <div className="flex items-center gap-2">
                <div className="!w-32 h-10 bg-gray-200 rounded-lg shimmer" />
                <div className="h-10 w-10 bg-gray-200 rounded-lg shimmer" />
                <div className="!w-48 h-10 bg-gray-200 rounded-lg shimmer" />
              </div>
            </div>

            {/* دکمه ورود */}
            <div className="mb-2">
              <div className="h-11 w-full bg-gray-300 rounded-lg shimmer" />
            </div>
            {/* دکمه ثبت نام */}
            <div className="mb-4">
              <div className="h-11 w-full bg-gray-200 rounded-lg shimmer" />
            </div>

            {/* لینک‌ها */}
            <div className="flex justify-between px-2 mb-6">
              <div className="h-4 w-24 bg-gray-200 rounded shimmer" />
              <div className="h-4 w-24 bg-gray-200 rounded shimmer" />
            </div>

            {/* ورود از طریق و خط */}
            <div className="flex items-center mt-4 mb-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 h-4 w-16 bg-gray-200 rounded shimmer" />
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* دکمه‌های ورود دولتی */}
            <div className="flex gap-4 mt-2 w-full max-w-sm mx-auto rtl:space-x-reverse">
              <div className="flex-1 h-12 bg-gray-200 rounded-lg shimmer" />
              <div className="flex-1 h-12 bg-gray-200 rounded-lg shimmer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSkeleton;
