import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `https://job-portal-itdo.onrender.com/api/v1/application/apply/${jobId}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const InfoItem = ({ label, value }) => (
    <div className="flex flex-col bg-gray-50 rounded-xl p-4">
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-900 mt-1">{value}</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT – Job Details */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {singleJob?.title}
              </h1>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-blue-50 text-blue-700 font-semibold">
                  {singleJob?.postion} Positions
                </Badge>
                <Badge className="bg-red-50 text-red-600 font-semibold">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 font-semibold">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            {/* Apply Button (Desktop) */}
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`h-11 px-6 rounded-xl font-semibold
            ${
              isApplied
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
            }
          `}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-8" />

          {/* Description */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Job Description
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            {singleJob?.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Role" value={singleJob?.title} />
            <InfoItem label="Location" value={singleJob?.location} />
            <InfoItem
              label="Experience"
              value={`${singleJob?.experience} yrs`}
            />
            <InfoItem label="Salary" value={`${singleJob?.salary} LPA`} />
            <InfoItem
              label="Total Applicants"
              value={singleJob?.applications?.length}
            />
            <InfoItem
              label="Posted Date"
              value={singleJob?.createdAt.split("T")[0]}
            />
          </div>
        </div>

        {/* RIGHT – Sticky Apply Card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Ready to apply?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Submit your application for this job position
            </p>

            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`w-full h-11 rounded-xl font-semibold
            ${
              isApplied
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
            }
          `}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
