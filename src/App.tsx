import './App.css'
import Dashboard from './dashboard/Dashboard'
import Home from './home/Home'
import NavBar from './nav/NavBar'
import { Route, Routes } from "react-router-dom"
import Register from './user/Register'
function App() {

  return (
    <>
      <div className="flex w-full gap-4">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
