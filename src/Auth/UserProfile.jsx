import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Link } from 'react-router-dom'

export default function UserProfile() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Address: {user.address}</p>
          <p>Birthdate: {user.birthdate}</p>
          <p>Name: {user.name}</p>
          <p>Phone Number: {user.phone_number}</p>
        </div>
      )}
      <button onClick={signOut}>Sign Out</button>
      
      <Link to="/change-password">Change Password</Link>
      
      <Link to="/update-user">Update Profile</Link>
    </div>
  )
}