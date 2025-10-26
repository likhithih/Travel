import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import MainPage from './pages/MainPage'

function App() {

  return (
    <>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes >
    </>
  )
}

export default App
