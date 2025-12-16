import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Todo from './components/Todo.jsx'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Welcome from './components/Welcome.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminTodos from './components/AdminTodos.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home/>} />
      </Route>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path="/signup" element={<Signup initialMode="signup" />} />
      <Route path="/login" element={<Signup initialMode="login" />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
       <Route path="/admin/todos" element={<AdminTodos />}/>
       <Route path="/about" element={<About/>}/>
       <Route path='/contact' element={<Contact/>}/>
      <Route element={<Layout />}>
        <Route path="/todo" element={<Todo />} />
      </Route>
    </Routes>

  </BrowserRouter>,
)
