const logout = () => {
  localStorage.clear();
  navigate("/login");
};
