import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div className="min-h-screen bg-muted/40">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Companies</h1>
            <p className="text-sm text-muted-foreground">
              Manage registered companies
            </p>
          </div>

          <Button onClick={() => navigate("/admin/companies/create")}>
            + New Company
          </Button>
        </div>

        {/* Search + Table */}
        <div className="bg-background rounded-2xl border shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
            <Input
              className="sm:max-w-sm"
              placeholder="Search by company name..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
