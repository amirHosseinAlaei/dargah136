
function ForgetSkeleton() {
  return (
    <div className="rounded-2xl p-6 flex flex-col bg-white max-w-md w-full min-h-[50vh] mt-10 mx-auto overflow-hidden">
      <div className="w-full rounded-xl p-6 flex flex-col justify-center h-full">
        {/* عنوان */}
        <div className="h-7 w-40 mx-auto mb-6 bg-gray-200 rounded shimmer" />

        {/* فرم اسکلت */}
        <div className="space-y-6">
          {/* کد ملی */}
          <div>
            <div className="h-4 w-20 mb-2 bg-gray-200 rounded shimmer" />
            <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
          </div>
          {/* شماره همراه */}
          <div>
            <div className="h-4 w-28 mb-2 bg-gray-200 rounded shimmer" />
            <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
          </div>
          {/* کپچا */}
          <div>
            <div className="h-4 w-20 mb-2 bg-gray-200 rounded shimmer" />
            <div className="flex items-center gap-2">
              <div className="!w-32 h-10 bg-gray-100 rounded-lg shimmer" />
              <div className="h-10 w-10 bg-gray-200 rounded-lg shimmer" />
              <div className="w-48 h-10 bg-gray-100 rounded-lg shimmer" />
            </div>
          </div>
          {/* دکمه ارسال */}
          <div className="h-11 w-full bg-gray-200 rounded-lg shimmer mt-2" />
        </div>
      </div>
    </div>
  );
}

export default ForgetSkeleton;
