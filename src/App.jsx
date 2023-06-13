import './App.css'
import Profil from './Pages/Profil/Profil'
import Public from './Pages/Public/Public'
import RequireAuth from './auth/RequireAuth'
import Layout from './components/Layout'
import Nav from './components/Nav/Nav'
import { Routes, Route } from 'react-router-dom'


function App() {
 
  return (
    <>
  <Nav />
  <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          {/* <Route path="sign-in" element={<Login />} /> */}
          {/* <Route path="signup" element={<Signup />} /> */}

          <Route element={<RequireAuth />}>
            <Route path='profil' element={<Profil />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
