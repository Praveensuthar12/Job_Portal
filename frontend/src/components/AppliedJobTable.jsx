import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Applied Jobs
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your job applications and their current status
        </p>
      </div>

      {/* Empty State */}
      {allAppliedJobs.length <= 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
          You haven’t applied for any jobs yet 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAppliedJobs.map((appliedJob) => (
            <div
              key={appliedJob._id}
              className="
            bg-white
            rounded-2xl
            border border-gray-100
            shadow-sm
            hover:shadow-lg
            transition
            p-5
          "
            >
              {/* Top */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-400">
                  Applied on {appliedJob?.createdAt?.split("T")[0]}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  appliedJob?.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : appliedJob?.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
                >
                  {appliedJob.status.toUpperCase()}
                </span>
              </div>

              {/* Job Info */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  {appliedJob.job?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {appliedJob.job?.company?.name}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">Application ID</span>
                <span className="text-xs font-mono text-gray-600">
                  #{appliedJob._id.slice(-6)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobTable;
