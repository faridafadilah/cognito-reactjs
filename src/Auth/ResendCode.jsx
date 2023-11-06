import { useState, useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { resendCode } from './auth';

export default function ResendCode() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await resendCode(username)

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h2>Resend Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/login">Login</Link>
    </div>
  )
}