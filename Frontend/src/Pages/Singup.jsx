import React, { useEffect, useState } from "react";
import AuthSidebar from "../UI components/AuthSidebar";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RiseLoader } from "react-spinners";

const Singup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Creating mutation for posting data
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:1200/user/register-user",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Info!",
        text: "Check your email box for verifing email!",
        icon: "info",
        confirmButtonText: "Cool",
        confirmButtonColor: "#ffd43b",
      });
    },
    onError: (error) => {
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
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        title: "Warning!",
        text: "Confirm Password and Password must be same",
        icon: "warning",
        confirmButtonText: "Cool",
        confirmButtonColor: "#ffd43b",
      });
    }
    mutation.mutate(data);
  };

  return (
    <div className="w-full grid md:grid-cols-2 relative h-screen lg:p-[1.2vw] md:p-[1.8vw] xs:p-[2.5vw] gap-[1.2vw]">
      <AuthSidebar />
      <div className="w-full h-full xs:absolute md:relative border border-gray-200 md:rounded-[1.3vw] xs:rounded-[1.8vw] flex items-center justify-center">
        <div className="w-[70%] bg-white/40 border border-white backdrop-blur-md xs:p-[3.5vw] md:p-0 rounded-[2vw]">
          <h1 className="md:text-[3.5vw] xs:text-[5.5vw] font-family-poppins font-semibold">
            Sign up
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            className="mt-3 flex flex-col gap-3"
          >
            <div className="w-full flex md:flex-row xs:flex-col items-center gap-3">
              {/* First Name Input */}
              <div className="w-full flex flex-col ">
                <div className="relative w-full xs:text-white md:text-black">
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstname", { required: true })}
                    className="block px-3 md:py-[1vw] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw] w-full  bg-transparent rounded-lg border-1 border-gray-300 appearance-none font-family-jost focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute md:text-[1.3vw] xs:text-[3.5vw]  duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] md:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 font-family-jost peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 start-1"
                  >
                    First Name
                  </label>
                </div>
                {errors.firstname && (
                  <span className="md:text-[0.8vw] xs:text-[2.8vw] text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col">
                {/* Last Name Input */}
                <div className="relative w-full xs:text-white md:text-black">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastname", { required: true })}
                    className="block px-3 md:py-[1vw] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw] w-full  bg-transparent font-family-jost rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute md:text-[1.3vw] xs:text-[3.5vw]  duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] md:bg-white font-family-jost px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 start-1"
                  >
                    Last Name
                  </label>
                </div>
                {errors.lastname && (
                  <span className="md:text-[0.8vw] xs:text-[2.8vw] text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col">
              {/* Email Input */}

              <div className="relative w-full xs:text-white md:text-black">
                <input
                  type="text"
                  id="email"
                  {...register("email", { required: true })}
                  className="block px-3 md:py-[1vw] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw] w-full  bg-transparent font-family-jost rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
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

            <div className="w-full flex flex-col">
              {/* Password Input */}

              <div className="relative w-full xs:text-white md:text-black">
                <input
                  type="text"
                  {...register("password", { required: true })}
                  id="password"
                  className="block px-3 md:py-[1vw] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw] w-full font-family-jost bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
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

            <div>
              {/* Confirm Password Input */}

              <div className="relative w-full xs:text-white md:text-black">
                <input
                  type="text"
                  id="conPassword"
                  {...register("confirmPassword", { required: true })}
                  className="block px-3 md:py-[1vw] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw] w-full font-family-jost bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="conPassword"
                  className="absolute md:text-[1.3vw] xs:text-[3.5vw]  duration-300 transform -translate-y-1/2 scale-75 top-0 z-10 origin-[0] md:bg-white font-family-jost px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 start-1"
                >
                  Confirm Password
                </label>
              </div>
              {errors.confirmPassword && (
                <span className="md:text-[0.8vw] xs:text-[2.8vw] text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <label
              htmlFor="submit"
              className="w-full flex cursor-pointer justify-center h-full md:py-[1vw] xs:py-[2.5vw] md:text-[1.2vw] xs:text-[3.7vw] font-family-poppins font-semibold my-2 rounded-[0.6vw] bg-theme-golden"
            >
              {mutation.isPending ? (
                <RiseLoader size={8} className="md:py-[0.5vw] xs:py-[2vw]" />
              ) : (
                <input
                  type="submit"
                  id="submit"
                  className="w-full h-full"
                  value={"Sign up"}
                />
              )}
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
