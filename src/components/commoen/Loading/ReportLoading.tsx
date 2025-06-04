import type { FC } from "react";
import React from "react";

const ReportStep1Skeleton: FC = () => {
  const steps = [1, 2, 3, 4];

  const StepperSkeleton = () => (
    <div className="flex justify-center items-center mb-6 select-none">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className="w-9 h-9 rounded-full border-2 bg-gray-200 shimmer flex items-center justify-center text-gray-400 font-bold" />
          {idx !== steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 rounded bg-gray-200 shimmer" />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg bg-white min-h-[50vh]">
      <div className="text-center mb-6 text-gray-300 font-black text-2xl h-8 w-60 mx-auto bg-gray-100 rounded shimmer" />
      <div className="text-center mb-2 font-semibold text-gray-300 h-4 w-32 mx-auto bg-gray-100 rounded shimmer" />
      <StepperSkeleton />

      <div>
        <div className="h-4 w-32 mb-2 bg-gray-200 rounded shimmer" />
        <div className="h-10 w-full mb-5 bg-gray-100 rounded-lg shimmer" />
        <div className="flex flex-wrap gap-8">
          <div className="flex-1 min-w-[180px]">
            <div className="h-4 w-28 mb-2 bg-gray-200 rounded shimmer" />
            <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
          </div>
          <div className="flex-1 min-w-[180px]">
            <div className="h-4 w-28 mb-2 bg-gray-200 rounded shimmer" />
            <div className="h-10 w-full bg-gray-100 rounded-lg shimmer" />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div />
        <div>
          <div className="h-10 w-36 bg-gray-200 rounded-lg shimmer" />
        </div>
      </div>
    </div>
  );
};

export default ReportStep1Skeleton;
