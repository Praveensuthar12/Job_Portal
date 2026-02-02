import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-background rounded-2xl border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-4 text-sm text-muted-foreground">
            A list of recently applied users
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Full Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Resume</TableHead>
              <TableHead className="font-semibold">Applied On</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants?.applications?.map((item) => (
              <TableRow key={item._id} className="hover:bg-muted/40 transition">
                <TableCell className="font-medium">
                  {item?.applicant?.fullname}
                </TableCell>

                <TableCell>{item?.applicant?.email}</TableCell>

                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">NA</span>
                  )}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-muted transition">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-36 p-2">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="p-2 rounded-md cursor-pointer hover:bg-muted transition text-sm"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
