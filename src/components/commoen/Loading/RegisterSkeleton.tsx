
function RegisterSkeleton() {
  return (
    <div className="flex bg-white p-4 rounded-lg shadow-lg md:shadow-none md:bg-transparent justify-center items-center">
      <div className="md:bg-white w-full px-5 rounded-lg sm:p-6 md:p-10 space-y-4 max-w-lg mx-auto">
        {/* لوگو و عنوان */}
        <div className="text-center space-y-3">
          <div className="w-36 sm:w-20 h-14 mx-auto bg-gray-200 rounded-2xl shimmer" />
          <div className="space-y-1">
            <div className="h-5 w-56 mx-auto bg-gray-200 rounded shimmer" />
            <div className="h-4 w-28 mx-auto bg-gray-100 rounded shimmer" />
          </div>
        </div>
        {/* فرم اسکلت */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نام */}
            <div>
              <div className="h-4 w-16 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
            </div>
            {/* نام خانوادگی */}
            <div>
              <div className="h-4 w-24 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
            </div>
            {/* نام پدر */}
            <div>
              <div className="h-4 w-20 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
            </div>
            {/* تاریخ تولد */}
            <div>
              <div className="h-4 w-20 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
            </div>
            {/* موبایل */}
            <div>
              <div className="h-4 w-24 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
            </div>
            {/* کد ملی */}
            <div>
              <div className="h-4 w-20 mb-2 bg-gray-200 rounded shimmer" />
              <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
            </div>
          </div>
          {/* کپچا */}
          <div>
            <div className="h-4 w-20 mb-2 bg-gray-200 rounded shimmer" />
            <div className="flex items-center gap-2">
              <div className="!w-32 h-10 bg-gray-100 rounded-lg shimmer" />
              <div className="h-10 w-10 bg-gray-200 rounded-lg shimmer" />
              <div className="flex-1 h-10 bg-gray-100 rounded-lg shimmer" />
            </div>
          </div>
          {/* دکمه ثبت نام */}
          <div className="h-11 w-full bg-gray-200 rounded-lg shimmer mt-2" />
        </div>
        {/* لینک ورود */}
        <div className="text-center mt-4">
          <div className="h-4 w-44 mx-auto bg-gray-100 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}

export default RegisterSkeleton;
