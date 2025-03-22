import React, { useEffect } from "react";
import AuthButton from "../UI components/AuthButton";
import AuthSidebar from "../UI components/AuthSidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const VerifiedEmail = () => {
  const [profileImg, setProfileImg] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleSetImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImg(e.target.files[0]);
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const { token } = useParams();

  // Verifing Email
  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const response = axios.post(
            "http://localhost:1200/user/verify-email",
            { token },
            {
              withCredentials: true,
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      verifyEmail();
    }
  }, [token]);

  // Creating mutation for posting data
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:1200/user/upload-image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response;
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Success",
        text: "Your account successfully created!",
        icon: "success",
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

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!profileImg) {
      Swal.fire({
        title: "Info",
        text: "Please Select a profile image!",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#ffd43b",
      });
    }
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    mutation.mutate(formData);
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
            onSubmit={handelSubmit}
            method="post"
            encType="multipart/form-data"
            className="mt-3 flex flex-col gap-3"
          >
            <div className="w-full flex flex-col items-center gap-3">
              <div className="md:w-[15vw] xs:w-[25vw] overflow-hidden md:h-[15vw] xs:h-[25vw] rounded-full border border-gray-300">
                {profileImagePreview ? (
                  <img
                    className="w-full object-cover h-full"
                    src={profileImagePreview}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>
              {/* Last Name Input */}
              <div className="relative w-full xs:text-white md:text-black flex">
                <label
                  htmlFor="profileImg"
                  className="md:w-[30%] xs:w-[40%] md:text-[1.3vw] xs:text-[3.5vw]  bg-black flex items-center justify-center rounded-l-lg text-white md:py-[1vw] xs:py-[3.5vw] xs:px-1 md:px-3"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  onChange={handleSetImage}
                  accept="image/*"
                  name="profileImg"
                  id={"profileImg"}
                  className="block px-3 md:py-[1vw] md:w-[70%] xs:w-[60%] md:text-[1.3vw] xs:text-[3.5vw] xs:py-[3.5vw]  bg-transparent font-family-jost rounded-r-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
              </div>
            </div>

            <label htmlFor="submit" className="relative">
              <input
                type="submit"
                value=""
                id="submit"
                className="w-full h-full absolute z-10 cursor-pointer"
              />
              <AuthButton text={"Submit"} />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
