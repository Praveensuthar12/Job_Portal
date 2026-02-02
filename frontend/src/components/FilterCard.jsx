import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div
      className="
  w-full
  lg:max-w-xs
  bg-white
  rounded-2xl
  border border-gray-200
  shadow-sm
  p-4
  sm:p-5
  lg:sticky
  lg:top-24
"
    >
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-base sm:text-lg font-bold text-gray-900">
          Filter Jobs
        </h1>
        <p className="text-xs text-gray-500 mt-1">Narrow down job results</p>
      </div>

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-5"
      >
        {fitlerData.map((data, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-gray-50/50 p-3"
          >
            {/* Filter Title */}
            <h2 className="text-sm font-semibold text-gray-800 mb-3">
              {data.fitlerType}
            </h2>

            {/* Options */}
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className="
                  flex items-center gap-3
                  rounded-lg
                  px-3 py-2
                  cursor-pointer
                  text-sm
                  transition
                  hover:bg-white
                "
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="text-purple-600"
                    />
                    <span className="text-gray-600">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
