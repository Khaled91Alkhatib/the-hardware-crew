import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNav = ({ user, setUser }) => {
  const navigate = useNavigate()

  const logout = (e) => {
    setUser({name: "", password: ""})
    navigate("/dashboard")
  }

  return (
    <>
    <div>AdminNav</div>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default AdminNav