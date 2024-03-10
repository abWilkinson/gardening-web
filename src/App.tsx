import './App.css'
import Dashboard from './dashboard/Dashboard'
import NavBar from './nav/NavBar'
import { Route, Routes, useNavigate } from "react-router-dom"
import Register from './user/Register'
import AuthProvider from './auth/AuthProvider'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { NextUIProvider } from '@nextui-org/react'
import { LoggedOutRoute } from './auth/LoggedOutRoute'
import Login from './user/Login'
import AddPi from './dashboard/AddPi'
function App() {

  const navigate = useNavigate();

  return (
    <NextUIProvider className="dark text-foreground bg-background" navigate={navigate}>
      <AuthProvider>
      <div className="flex w-full gap-4">
        <NavBar />
      </div>
        <Routes>
          {
          //Logged in only
          }
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}/>
          </Route>
          <Route path="/addPi" element={<ProtectedRoute />}>
            <Route path="/addPi" element={<AddPi />}/>
          </Route>
          {
          //Logged out only
          }
          <Route path="/" element={<LoggedOutRoute />}>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </NextUIProvider>
  )
}

export default App
