import React, { useState } from "react";
import AuthButton from "../UI components/AuthButton";
import AuthSidebar from "../UI components/AuthSidebar";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthContext } from "../Context/UseAuthProvider";
import Swal from "sweetalert2";
import { RiseLoader } from "react-spinners";
import { useForm } from "react-hook-form";

const Signin = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { isAuth, setIsAuth } = useAuthContext();

  // Create mutation for posting data for login
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:1200/user/login",
        data,
        {
          withCredentials: true,
        }
      );
      return response;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Welcome back to our website!",
        icon: "success",
        confirmButtonText: "Cool",
        confirmButtonColor: "#ffd43b",
      });
      setIsAuth(true);
    },
    onError: (error) => {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred",
        icon: "error",
        confirmButtonText: "Cool",
        confirmButtonColor: "#ffd43b",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full grid md:grid-cols-2 relative h-screen lg:p-[1.2vw] md:p-[1.8vw] xs:p-[2.5vw] gap-[1.2vw]">
      <AuthSidebar />
      <div className="w-full h-full xs:absolute md:relative border border-gray-200 md:rounded-[1.3vw] xs:rounded-[1.8vw] flex items-center justify-center">
        <div className="w-[70%] bg-white/40 border border-white backdrop-blur-md xs:p-[3.5vw] md:p-0 rounded-[2vw]">
          <h1 className="md:text-[3.5vw] xs:text-[5.5vw] font-family-poppins font-semibold">
            Sign in
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            className="mt-3 flex flex-col gap-3"
          >
            <div className="flex flex-col w-full">
              {/* Email Input */}
              <div className="relative w-full xs:text-white md:text-black">
                <input
                  type="text"
                  id="email"
                  className="block px-3 md:py-[1vw] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw] w-full  bg-transparent font-family-jost rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("email", { required: true })}
                />
                <label
                  htmlFor="email"
                  className="absolute md:text-[1.3vw] xs:text-[3.5vw]  duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] md:bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 font-family-jost peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 start-1"
                >
                  Email
                </label>
              </div>
              {errors.email && (
                <span className="md:text-[0.8vw] xs:text-[2.8vw] text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col w-full">
              {/* Password Input */}

              <div className="relative w-full xs:text-white md:text-black">
                <input
                  type="password"
                  id="password"
                  className="block px-3 md:py-[1vw] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw] w-full font-family-jost bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("password", { required: true })}
                />
                <label
                  htmlFor="password"
                  className="absolute md:text-[1.3vw] xs:text-[3.5vw]  duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] md:bg-white font-family-jost px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 start-1"
                >
                  Password
                </label>
              </div>
              {errors.password && (
                <span className="md:text-[0.8vw] xs:text-[2.8vw] text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <label
              htmlFor="submit"
              className="w-full flex justify-center h-full md:py-[1vw] xs:py-[2.5vw] md:text-[1.2vw] xs:text-[3.7vw] font-family-poppins font-semibold my-2 rounded-[0.6vw] bg-theme-golden"
            >
              {mutation.isPending ? (
                <RiseLoader size={8} className="md:py-[0.5vw] xs:py-[2vw]" />
              ) : (
                <input type="submit" id="submit" value={"Sign in"} />
              )}
            </label>
          </form>
          <p className="md:text-[1.3vw] xs:text-[3.5vw] py-2 md:leading-[1.7vw] xs:leading-[4.2vw] text-center mt-2 font-medium font-family-jost">
            Create a new account <Link to={"/sign-up"}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
