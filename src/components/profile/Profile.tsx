import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { RootState, AppDispatch } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { getProfile } from "../../features/auth/authActions";

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook
  const { profile, isLoading, accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (accessToken && !profile) {
      dispatch(getProfile(accessToken));
    }
  }, [dispatch, accessToken, profile]);

  const handleLogout = () => {
    // Dispatch the logout action to clear user data
    dispatch(logout());
    
    // Navigate to the home page ("/") after logout
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
