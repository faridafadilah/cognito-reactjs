import { useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";

function Profile() {
  const accessToken = localStorage.getItem('accessToken');
console.log(accessToken);
  return (
    <div>
      <h1>Profile</h1>
      <p>Your secret token is: {accessToken}</p>
    </div>
  );
}

export default Profile;