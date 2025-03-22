import axios from "axios";

export const checkAuth = async () => {
  try {
    const response = await axios.get("http://localhost:1200/user/check_auth", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
