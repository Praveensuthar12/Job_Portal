import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-background rounded-2xl border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="py-4 text-sm text-muted-foreground">
            A list of your recently registered companies
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Logo</TableHead>
              <TableHead className="font-semibold">Company Name</TableHead>
              <TableHead className="font-semibold">Created On</TableHead>
              <TableHead className="text-right font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany?.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-muted/40 transition"
              >
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">{company.name}</TableCell>

                <TableCell className="text-muted-foreground">
                  {company.createdAt.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-muted transition">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-36 p-2">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </div>
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

export default CompaniesTable;
