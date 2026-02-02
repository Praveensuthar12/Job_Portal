import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Popular Categories
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {category.map((cat, index) => (
          <button
            key={index}
            onClick={() => searchJobHandler(cat)}
            className="
          snap-start
          whitespace-nowrap
          px-6 py-3
          rounded-full
          border border-gray-200
          bg-white
          text-gray-700
          font-medium
          shadow-sm
          hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600
          hover:text-white
          transition-all duration-300
        "
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
