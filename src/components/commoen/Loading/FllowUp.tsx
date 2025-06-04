import React from "react";

const FollowUpIndexSkeleton: React.FC = () => (
  <div
    className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-md"
    style={{ maxHeight: "80vh", overflowY: "auto" }}
  >
    <div className="font-extrabold text-slate-300 text-2xl mb-6 text-center h-8 w-44 mx-auto bg-gray-100 rounded shimmer" />

    <form>
      <div className="mb-5">
        <div className="h-4 w-28 mb-2 bg-gray-200 rounded shimmer" />
        <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
      </div>

      <div className="mb-5">
        <div className="h-4 w-24 mb-2 bg-gray-200 rounded shimmer" />
        <div className="flex items-center gap-2">
          <div className="h-10 w-32 rounded-lg bg-gray-100 shimmer" />
          <div className="h-10 w-10 rounded-lg bg-gray-100 shimmer flex items-center justify-center" />
          <div className="flex-1 h-10 rounded-lg bg-gray-100 shimmer" />
        </div>
      </div>

      <div>
        <div className="h-10 w-full bg-gray-200 rounded-lg shimmer" />
      </div>
    </form>
  </div>
);

export default FollowUpIndexSkeleton;
