import './App.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import HomePage from './routes/HomePage'
import Formular from './routes/Formular'
import Welcome from './routes/Welcome'
import Login from './autentificare/Login'
import Register from './autentificare/Register'
import Rezultate from './routes/Rezultate'
import Teste from './routes/teste'
import NotFound from './routes/NotFound'
import Profile from './routes/Profile'
import Settings from './routes/Settings'
import { ProtectedRoute } from './ProtectedRoute'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({});

function App() {
 
  return (
   
        <QueryClientProvider client={queryClient}>
        <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='autentificare/login' element={<Login/>}></Route>
        <Route path='autentificare/register' element={<Register/>}></Route>~
        <Route path='/consultanta/:antrenor' element={<Formular/>} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path='/welcome' element={<Welcome/>} />
          <Route path='/rezultate' element={<Rezultate/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/settings' element={<Settings/>} />
          <Route path='/teste' element={<Teste/>} />
         </Route>
          
        <Route path='*' element={<NotFound/>}></Route>
        
        </Routes>
         < Toaster position='top-right' />
      </QueryClientProvider>
  )
}

export default App