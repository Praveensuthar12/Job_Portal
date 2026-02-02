import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const randomJobs = [1, 2,45];

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Job Opportunities
          </h1>

          <p className="text-gray-500 max-w-2xl">
            Discover jobs that match your skills and career goals
          </p>

          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold shadow">
              {allJobs.length} Open Positions
            </span>
          </div>
        </div>

        {/* Jobs Container */}
        <div className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
