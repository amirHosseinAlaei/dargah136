
function CardSkeleton() {
  return (
    <div
      className="p-4 w-full flex flex-col items-center rounded-lg bg-white shadow"
      style={{ minHeight: 180 }}
    >
      <div className="w-16 h-16 bg-gray-200 rounded-full mb-3 shimmer" />
      <div className="w-3/4 h-4 bg-gray-200 rounded mb-2 shimmer" />
      <div className="w-1/2 h-3 bg-gray-100 rounded shimmer" />
    </div>
  );
}

function ContentLoading() {
  const skeletonCount = 6;
  return (
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 w-32 bg-gray-200 rounded shimmer" />
          <div className="h-10 w-10 bg-gray-100 rounded-xl shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentLoading;
