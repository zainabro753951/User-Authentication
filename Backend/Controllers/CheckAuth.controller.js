const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: "Authorization successfully!", user });
  } catch (error) {
    console.log(`Error during authorization checking ${error}`);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default checkAuth;
