import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8"
        >
          {/* Heading */}
          <h1 className="font-bold text-2xl text-center mb-6">
            Login to <span className="text-[#6A38C2]">JobPortal</span>
          </h1>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="@gmail.com"
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

              {/* Role Selection */}
         <div className="mb-5">
         <Label className="text-sm font-medium block mb-2">Login as</Label>

        <div className="flex flex-col sm:flex-row gap-3">
         <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:border-[#6A38C2] w-full sm:w-auto">
          <Input
        type="radio"
        name="role"
        value="student"
        checked={input.role === "student"}
        onChange={changeEventHandler}
      />
      <span className="text-sm font-medium">Student</span>
    </label>

    <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:border-[#6A38C2] w-full sm:w-auto">
      <Input
        type="radio"
        name="role"
        value="recruiter"
        checked={input.role === "recruiter"}
        onChange={changeEventHandler}
      />
      <span className="text-sm font-medium">Recruiter</span>
    </label>
  </div>
</div>


          {/* Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              Login
            </Button>
          )}

          {/* Footer */}
          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#6A38C2] font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
