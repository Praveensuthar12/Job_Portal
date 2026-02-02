import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="
    group
    bg-white
    rounded-2xl
    border border-gray-100
    p-5
    cursor-pointer
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-xl
  "
    >
      {/* Company */}
      <div className="mb-3">
        <h1 className="text-sm font-semibold text-gray-700">
          {job?.company?.name}
        </h1>
        <p className="text-xs text-gray-400">India</p>
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 leading-snug">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700">
          {job?.position} Positions
        </span>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-600">
          {job?.jobType}
        </span>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-50 text-purple-700">
          {job?.salary} LPA
        </span>
      </div>
    </div>
  );
};

export default LatestJobCards;
