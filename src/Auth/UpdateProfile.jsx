import { useContext, useState } from "react"
import { AuthContext } from './AuthContext'
import { updateUser } from './auth'

export default function UpdateProfile() {
  const { user } = useContext(AuthContext)
  const [username, setUsername] = useState(user.username)
  const [address, setAddress] = useState(user.address || "")
  const [email, setEmail] = useState(user.email)
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || "")
  const [gender, setGender] = useState(user.gender || "")
  const [name, setName] = useState(user.name || "")
  const [birthdate, setBirthdate] = useState(user.birthdate || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await updateUser(username, address, email, phoneNumber, gender, name, birthdate)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>Update Profile</h2>
        <p>Your profile has been change successfully!</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
         <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}