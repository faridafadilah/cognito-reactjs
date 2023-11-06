import { useContext, useState } from "react"
import { changePassword } from "../service/auth"
import { AuthContext } from './AuthContext'

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { user } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await changePassword(user.username, oldPassword, newPassword)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>Change password</h2>
        <p>Your password has been change successfully!</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}