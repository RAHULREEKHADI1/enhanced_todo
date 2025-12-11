import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Todo from './components/Todo.jsx'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster />
    <Routes>
      {/* <Route element={<Layout />}> */}
        <Route path="/" element={<Signup initialMode="signup" />} />
        <Route path="/signup" element={<Signup initialMode="signup" />} />
        <Route path="/login" element={<Signup initialMode="login" />} />
        <Route path="/todo" element={<Todo />} />
      {/* </Route> */}
    </Routes>

  </BrowserRouter>,
)
