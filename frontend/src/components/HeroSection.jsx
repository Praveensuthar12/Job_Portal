import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm">
            No. 1 Job Hunt Website
          </span>

          {/* Heading */}
          <h1 className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl">
            Search, Apply & <br className="hidden sm:block" />
            Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            aspernatur temporibus nihil tempora dolor!
          </p>

          {/* Search Bar */}
          <div className="flex w-full sm:w-[80%] md:w-[55%] lg:w-[40%] mx-auto shadow-md border border-gray-200 rounded-full overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-sm sm:text-base"
            />

            <Button
              onClick={searchJobHandler}
              className="rounded-none rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] px-6"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
