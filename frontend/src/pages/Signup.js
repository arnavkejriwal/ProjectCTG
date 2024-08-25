import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Button } from '@mui/material'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [age, setAge] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, name, number, age, isAdmin)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <label>Full Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>Phone Number:</label>
      <input 
        type="number" 
        onChange={(e) => setNumber(e.target.value)} 
        value={number} 
      />
      <label>Age:</label>
      <input 
        type="date" 
        onChange={(e) => setAge(e.target.value)} 
        value={age} 
      />
      <Button variant="contained" type="submit" disabled={isLoading}>Sign Up</Button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup