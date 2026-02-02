import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "lsekdhjgdsnfvsdkjf";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className="
    group
    bg-white/80 backdrop-blur
    border border-gray-100
    rounded-2xl
    p-5
    shadow-sm
    hover:shadow-xl
    transition-all duration-300
  "
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400 font-medium">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-purple-50 text-gray-500"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-xl border bg-gray-50">
          <Avatar className="h-12 w-12">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>

        <div>
          <h1 className="text-base font-semibold text-gray-900">
            {job?.company?.name}
          </h1>
          <p className="text-xs text-gray-400">United States</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full">
          {job?.position} Positions
        </span>
        <span className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">
          {job?.jobType}
        </span>
        <span className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-50 rounded-full">
          {job?.salary} LPA
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1"
        >
          View Details
        </Button>

        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          Save Job
        </Button>
      </div>
    </div>
  );
};

export default Job;
