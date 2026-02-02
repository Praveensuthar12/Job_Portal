import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 my-6 p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-5">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-gray-100">
                <AvatarImage
                  src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  alt="profile"
                />
              </Avatar>

              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {user?.fullname}
                </h1>
                <p className="text-sm text-gray-500 mt-1 max-w-md">
                  {user?.profile?.bio || "No bio added"}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="self-start sm:self-center rounded-full"
            >
              <Pen className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Contact className="h-4 w-4" />
              <span className="text-sm">{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Resume</h2>
            {isResume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                className="inline-flex items-center text-sm text-blue-600 hover:underline"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-sm text-gray-400">NA</span>
            )}
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-10">
          <h1 className="text-lg font-semibold text-gray-900 mb-4">
            Applied Jobs
          </h1>

          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
