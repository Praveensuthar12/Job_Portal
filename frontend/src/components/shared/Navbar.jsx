import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white sticky top-0 z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-6 text-sm font-semibold text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-[#6A38C2] transition">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#6A38C2] transition">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#6A38C2] transition">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#6A38C2] transition">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#6A38C2] transition">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth / Avatar */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-[#6A38C2] transition">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-xs text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100"
                    >
                      <User2 size={16} />
                      <span className="text-sm">View Profile</span>
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-red-50 text-red-500 w-full"
                  >
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                ☰
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-4">
              <ul className="flex flex-col gap-3 text-sm font-semibold text-gray-700">
                {user && user.role === "recruiter" ? (
                  <>
                    <Link to="/admin/companies">Companies</Link>
                    <Link to="/admin/jobs">Jobs</Link>
                  </>
                ) : (
                  <>
                    <Link to="/">Home</Link>
                    <Link to="/jobs">Jobs</Link>
                    <Link to="/browse">Browse</Link>
                  </>
                )}

                {!user && (
                  <div className="pt-3 border-t space-y-2">
                    <Link to="/login">
                      <Button variant="outline" className="w-full" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full bg-[#6A38C2]" size="sm">
                        Signup
                      </Button>
                    </Link>
                  </div>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
