import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Event from './pages/Event'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Quizzes from './pages/Quizzes'
import TrainingPage from './pages/Training'

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/home" 
              element={user ? <Admin /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/home" />} 
            />
            <Route 
              path="/admin" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/home" />}
            />
            <Route 
              path="/events" 
              element={<Event />} 
            />
            <Route 
              path="/profile" 
              element={<Profile />} 
            />
            <Route 
              path="/quizzes" 
              element={<Quizzes />} 
            />
            <Route
              path="/training"
              element={<TrainingPage/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;